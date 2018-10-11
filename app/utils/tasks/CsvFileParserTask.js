import JdxDatabase from '../JdxDatabase';
import * as iconv from 'iconv-lite';
import DbBackgroundTask from './DbBackgroundTask';

const syspath = require('electron').remote.require('path');
const jetpack = require('electron').remote.require('fs-jetpack');
const _ = require('lodash');
const minimatch = require('minimatch');
const csvparser = require('electron').remote.require('csv-parse');

export default class CsvFileParserTask extends DbBackgroundTask {
  static getTaskType() {
    return 'CsvFileParserTask';
  }

  async execute(args) {
    const db = await JdxDatabase.get(args.project);
    const definition = JdxDatabase.getDefinition(args.project.gameType);

    this.progress(0, 1, 'Finding CSV files...');

    const pathsToTypeId = await this.filterFilesByPath(db.files, definition.types, 'csv_files', args.filterTypes, args.paths);

    const fileCount = _.size(pathsToTypeId);

    const csvResults = [];
    const relations = [];
    for (const [path, typeId] of _.entries(pathsToTypeId)) {
      const fullPath = args.project.rootPath + syspath.sep + path.replace(new RegExp('/', 'g'), syspath.sep);
      let csvData = await new Promise((resolve, reject) => {
        csvparser(iconv.decode(jetpack.read(fullPath, 'buffer'), 'win1252'), {
          delimiter: ';',
          skip_empty_lines: true,
          relax_column_count: true,
        }, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      // Remove comment-rows, if in definition
      const typeDefinition = definition.types.find((def) => def.id === typeId);
      if (typeDefinition && typeDefinition.sourceType && typeDefinition.sourceType.rowCommentPrefix) {
        csvData = csvData.filter((row) => !_.startsWith(row[0], typeDefinition.sourceType.rowCommentPrefix));
      }

      const uniqueColumns = [];
      csvData[0].forEach(column => {
        let nr = 0;
        let newColumn = column;
        while (_.includes(uniqueColumns, newColumn)) {
          nr += 1;
          newColumn = column + '_' + nr;
        }
        uniqueColumns.push(newColumn);
      });
      const csvDataObject = _.map(csvData.slice(1), (row) => _.zipObject(uniqueColumns, row));

      if (csvResults.length % Math.floor(fileCount / this.progressReportRate) === 0) {
        this.progress(csvResults.length, fileCount, `Parsing ${fileCount} CSV files...`);
      }

      csvResults.push({path, data: csvDataObject});
      relations.push(this.addRelationId({
        fromKey: 'csv_files',
        fromType: 'csv_files',
        fromId: path,
        toKey: 'source',
        toType: 'files',
        toId: path
      }));
    }

    // Delete not found file data
    await this.deleteMissing(csvResults, db.csv_files, definition.types, 'csv_files', args.filterTypes, args.paths);

    await this.saveChunked(csvResults, db.csv_files, 0, 500);
    await this.saveChunked(relations, db.relations, 0, 500);

    JdxDatabase.updateTypeIdentifiers(args.project, 'csv_files');
  }
}

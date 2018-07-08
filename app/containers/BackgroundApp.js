// @flow
import React, {Component} from 'react';
import FileLoaderTask from '../utils/tasks/FileLoaderTask';
import PdxScriptParserTask from '../utils/tasks/PdxScriptParserTask';
import PdxDataParserTask from '../utils/tasks/PdxDataParserTask';
import StructureLoaderTask from '../utils/tasks/StructureLoaderTask';
import LuaScriptParserTask from '../utils/tasks/LuaScriptParserTask';
import StructureScannerTask from '../utils/tasks/StructureScannerTask';
import CsvFileParserTask from '../utils/tasks/CsvFileParserTask';
import PdxYmlFileParserTask from '../utils/tasks/PdxYmlFileParserTask';
import DeleteRelatedTask from '../utils/tasks/DeleteRelatedTask';
import IndexedBmpParserTask from '../utils/tasks/IndexedBmpParserTask';
import DdsImageParserTask from '../utils/tasks/DdsImageParserTask';
import SchemaValidatorTask from '../utils/tasks/SchemaValidatorTask';
import JdxDatabase from '../utils/JdxDatabase';

const ipc = require('electron').ipcRenderer;

export default class BackgroundApp extends Component {
  constructor(props) {
    super(props);
    JdxDatabase.loadDefinitions();

    ipc.removeAllListeners('background-request');
    ipc.on('background-request', (event, request) => {
      switch (request.taskType) {
        case FileLoaderTask.getTaskType():
          FileLoaderTask.handle(request);
          break;
        case PdxScriptParserTask.getTaskType():
          PdxScriptParserTask.handle(request);
          break;
        case PdxDataParserTask.getTaskType():
          PdxDataParserTask.handle(request);
          break;
        case StructureLoaderTask.getTaskType():
          StructureLoaderTask.handle(request);
          break;
        case LuaScriptParserTask.getTaskType():
          LuaScriptParserTask.handle(request);
          break;
        case CsvFileParserTask.getTaskType():
          CsvFileParserTask.handle(request);
          break;
        case PdxYmlFileParserTask.getTaskType():
          PdxYmlFileParserTask.handle(request);
          break;
        case IndexedBmpParserTask.getTaskType():
          IndexedBmpParserTask.handle(request);
          break;
        case DdsImageParserTask.getTaskType():
          DdsImageParserTask.handle(request);
          break;
        case StructureScannerTask.getTaskType():
          StructureScannerTask.handle(request);
          break;
        case SchemaValidatorTask.getTaskType():
          SchemaValidatorTask.handle(request);
          break;
        case DeleteRelatedTask.getTaskType():
          DeleteRelatedTask.handle(request);
          break;
        default:
      }
    });
  }

  render() {
    return (
      <div style={{margin: 20}}>This background window is a work-window... nothing interesting going on here visually. Check logs for debugging.</div>
    );
  }
}

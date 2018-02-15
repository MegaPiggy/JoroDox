// @flow
import React, { Component } from 'react';

import {Icon, IconButton, Paper, Tooltip, Typography} from "material-ui";
import Eu4Definition from "../definitions/eu4";
import JdxDatabase from "../utils/JdxDatabase";
import {applyGridConfig, Grid} from 'react-redux-grid';
import _ from 'lodash';
import {Link} from "react-router-dom";
import {Actions} from "react-redux-grid";
import {connect} from "react-redux";


class StructureItemView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            relationsFrom: [],
            relationsTo: [],
        };
    }

    createTreeItem(key, item, parentId, idCounter, depth) {
        if (!idCounter) {
            idCounter = {id: 1};
        }
        if (depth === undefined) {
            depth = 0;
        }
        else {
            depth = depth + 1;
        }

        let isArray = _.isArray(item);

        let treeItem = {
            id: !parentId ? -1 : idCounter.id++,
            key: key,
            value: isArray ? <i style={{color: 'lightgrey'}}>[{item.length} items]</i> : (_.isPlainObject(item) ? <i style={{color: 'lightgrey'}}>[{_(item).size()} properties]</i> : <span style={{color: 'green'}}>{(_.isObject(item) ? item.toString() : item)}</span>),
            parentId: parentId,
            _hideChildren: parentId && depth > 1 ? true : false,
            children: [],
        };
        idCounter.id++;

        if (_.isArray(item)) {
            _(item).forEach((value, key) => {
                treeItem.children.push(this.createTreeItem(!isArray ? key : <i>{key}</i>, value, treeItem.id, idCounter, depth));
            });
        }
        else if (_.isPlainObject(item)) {
            _(item).forOwn((value, key) => {
                treeItem.children.push(this.createTreeItem(key, value, treeItem.id, idCounter, depth));
            });
        }

        return !parentId ? {root: treeItem} : treeItem;
    }

    componentDidMount() {
        this.loadRelations(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadRelations(nextProps);
    }

    loadRelations(props) {
        let typeDefinition = _(Eu4Definition.types).find(x => x.id === props.match.params.type);

        if (typeDefinition) {
            JdxDatabase.get(props.root).then(db => {
                db.relations.where({fromType: typeDefinition.id, fromId: props.match.params.id}).toArray(relations => {
                    this.setState({relationsFrom: _.sortBy(relations, ['toKey', 'toType', 'toId'])});
                });
                db.relations.where({toType: typeDefinition.id, toId: props.match.params.id}).toArray(relations => {
                    this.setState({relationsTo: _.sortBy(relations, ['fromKey', 'fromType', 'fromId'])});
                });
            });
        }
    }

    render() {
        if (!this.props.match.params.type) {
            return <Paper style={{flex: 1, margin: 20, padding: 20, alignSelf: 'flex-start'}}><p>Error during type view load.</p></Paper>;
        }

        let typeDefinition = _(Eu4Definition.types).find(x => x.id === this.props.match.params.type);
        if (!typeDefinition) {
            return <Paper style={{flex: 1, margin: 20, padding: 20, alignSelf: 'flex-start'}}><p>Could not find type definition.</p></Paper>;
        }

        /*
        if (!this.state.item) {
            JdxDatabase.get(this.props.root)[typeDefinition.id].where({[typeDefinition.primaryKey]: this.props.match.params.id}).first(item => {
                if (item) {
                    console.log(this.createTreeItem('root', item));
                    this.setState({
                        item: item,
                        treeItem: this.createTreeItem('root', item),
                    });
                }
            });
        }*/
        let view = this;
        let dataSource = function getData({pageIndex, pageSize}) {
            return new Promise((resolve) => {
                JdxDatabase.get(view.props.root).then(db => {
                    db[typeDefinition.id].where({[typeDefinition.primaryKey]: view.props.match.params.id}).first(item => {
                        if (item) {
                            let treeItem = view.createTreeItem('root', item);
                            view.setState({item: item});
                            resolve({data: treeItem, total: 1});
                        }
                    });
                });
            });
        };

        let gridSettings = {
            height: false,
            gridType: 'tree',
            columns: [
                {
                    name: 'Name',
                    dataIndex: 'key',
                    width: '25%',
                    expandable: true,

                },
                {
                    name: 'Value',
                    dataIndex: 'value',
                    expandable: false,
                },
            ],
            plugins: {
                COLUMN_MANAGER: {
                    resizable: true,
                    minColumnWidth: 10,
                    moveable: true,
                    sortable: false,
                },
                LOADER: {
                    enabled: true
                },
            },
            dataSource: dataSource,
            stateKey: "typeView-" + this.props.match.params.type +"-" + this.props.match.params.id,
            pageSize: 1000,
            style: {
                display: 'flex',
                flexDirection: 'column',
            },
            events: {
                HANDLE_ROW_CLICK: ({row}) => {
                    this.props.setTreeNodeVisibility(row._id, !row._isExpanded, "typeView-" + this.props.match.params.type +"-" + this.props.match.params.id, false);
                },
            },
        };

        return (
            <Paper style={{flex: 1, margin: 20, padding: 20, alignSelf: 'flex-start'}}>
                <Typography variant="display1" gutterBottom>{typeDefinition.title}: {this.props.match.params.id}</Typography>

                <Grid {...gridSettings}></Grid>

                {this.state.relationsFrom.length > 0 &&
                    <div>
                        <h4>Linked from</h4>
                        <ul>
                            {this.state.relationsFrom.map(r => <li key={r.id}>{r.toKey}: <Link
                                to={`/structure/${r.toType}/${r.toId}`}>{r.toId}</Link></li>)}
                        </ul>
                    </div>
                }
                {this.state.relationsTo.length > 0 &&
                    <div>
                        <h4>Linked to</h4>
                        <ul>
                            {this.state.relationsTo.map(r => <li key={r.id}>{r.fromKey}: <Link
                                to={`/structure/${r.fromType}/${r.fromId}`}>{r.fromId}</Link></li>)}
                        </ul>
                    </div>
                }

            </Paper>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTreeNodeVisibility: (id, visible, stateKey, showTreeRootNode) => {
            dispatch(Actions.GridActions.setTreeNodeVisibility({id, visible, stateKey, showTreeRootNode}))
        },
    }
}

export default connect(null, mapDispatchToProps)(StructureItemView);
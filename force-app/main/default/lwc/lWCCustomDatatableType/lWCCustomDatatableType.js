import LightningDatatable from 'lightning/datatable';
import multiselectpicklistColumn from './multiselectpicklistColumn.html';
import picklistEditable from './picklistEditable.html';

export default class LWCCustomDatatableType extends LightningDatatable {
    static customTypes = {
        multiselectpicklistColumn: {
            template: multiselectpicklistColumn,
            editTemplate: multiselectpicklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name']
        },
        picklistColumn: {
            template: picklistEditable,
            editTemplate: picklistEditable,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name']
        }
    };
}
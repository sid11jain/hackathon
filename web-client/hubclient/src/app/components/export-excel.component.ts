import { Component, OnInit, Input } from '@angular/core';
import { ExportExcelService } from '../services/export-excel.service';

export class ExportExcelComponent {
    title = 'angular-export-to-excel';

    dataForExcel = [];

    ideaData = [{
        name: 'idea1',
        description: 'desc1',
        postedOn: '13-06-20',
        submittedBy: 'Ajay'
    },
        {
            name: 'Idea2',
            description: 'desc2',
            postedOn: '14-06-20',
            submittedBy: 'Sid'
    }];

    constructor(public ete: ExportExcelService) { }

    exportToExcel() {
        this.ideaData.forEach((row: any) => {
            this.dataForExcel.push(Object.values(row));
        });

        const reportData = {
            title: 'Idea data export to excel',
            data: this.dataForExcel,
            headers: Object.keys(this.ideaData[0])
        };
        this.ete.exportExcel(reportData);
    }
}

import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logo from './ihslogo.js';

@Injectable({
    providedIn: 'root'
})

export class ExportExcelService {
    constructor() { }

    exportExcel(excelData) {
        // Title, Header and Data
        const title = excelData.title;
        const header = excelData.headers;
        const data = excelData.data;

        // Create a workbook with a worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Ideas');

        // Add title row and formatting
        worksheet.mergeCells('C1', 'F4');
        const titleRow = worksheet.getCell('C1');
        titleRow.value = title;
        titleRow.font = {
            name: 'Calibri',
            size: 16,
            underline: 'single',
            bold: true,
            color: { argb: '0085A3' }
        };
        titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

        // Adding current date alongside title
        worksheet.mergeCells('G1:H4');
        const d = new Date();
        const date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
        const dateCell = worksheet.getCell('G1');
        dateCell.value = date;
        dateCell.font = {
            name: 'Calibri',
            size: 12,
            bold: true
        };
        dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Add Image
        const myLogoImage = workbook.addImage({
            base64: logo.imgBase64,
            extension: 'png',
        });
        worksheet.mergeCells('A1:B4');
        worksheet.addImage(myLogoImage, 'A1:B4');

        // Blank row
        worksheet.addRow([]);

        // Adding header row
        const headerRow = worksheet.addRow(header);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4167B8' },
                bgColor: { argb: '' }
            };
            cell.font = {
                bold: true,
                color: { argb: 'FFFFFF' },
                size: 12
            };
        });

        // Adding data
        data.forEach(dataRow => {
            const row = worksheet.addRow(dataRow);
        });

        worksheet.getColumn(3).width = 20;
        worksheet.addRow([]);

        // Adding footer row
        const footerRow = worksheet.addRow(['Idea data exported from Innovations Hub at ' + date]);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFB050' }
        };
        footerRow.alignment = { vertical: 'middle', horizontal: 'center' };
        // Merge footer cells
        worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

        // Generate and save excel file
        workbook.xlsx.writeBuffer().then((dataContent) => {
            const blob = new Blob([dataContent], { type: 'application/vnd.openxmlformats-officialdocument.spreadsheetml.sheet' });
            fs.saveAs(blob, title + '.xlsx');
        });
    }
}

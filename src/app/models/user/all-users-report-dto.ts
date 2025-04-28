import { ExportTypeEnum } from "../print/ExportTypeEnum";

export class AllUsersReportDto{
    searchText : string = "";
    employmentNumber: string = "";
    isActive! : boolean | null;
    exportType : ExportTypeEnum = ExportTypeEnum.PDF;
    committeeId : string | null = null;
}
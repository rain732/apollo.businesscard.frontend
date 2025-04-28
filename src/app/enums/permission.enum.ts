export enum PermissionEnum
{
    /// <summary>
    /// مدير النظام
    /// </summary>
    SystemAdministrator = 1,

    /// <summary>
    /// مستخدم في اللجنة الطبية المحلية
    /// </summary>
    LocalMedicalCommitteeUser = 2,

    /// <summary>
    /// قسم الوثائق
    /// </summary>
    DocumentsDepartment = 3,

    /// <summary>
    /// قسم التوصيات
    /// </summary>
    RecommendationsDepartment = 4,

    /// <summary>
    /// مقرر اللجنة الطبية المحلية
    /// </summary>
    LocalMedicalCommitteeDecider = 5,

    /// <summary>
    /// عضو اللجنة الطبية المحلية
    /// </summary>
    LocalMedicalCommitteeMember = 6,

    /// <summary>
    /// رئيس اللجنة الطبية المحلية
    /// </summary>
    LocalMedicalCommitteeChairman = 7,

    /// <summary>
    /// سكرتير اللجنة الطبية المحلية
    /// </summary>
    LocalMedicalCommitteeSecretary = 8,

    /// <summary>
    /// منسوب الوحدات العسكرية
    /// </summary>
    MilitaryUnitsAffiliate = 9,

    /// <summary>
    /// الوصول للوحة المعلومات
    /// </summary>
    DashboardAccess = 15
}
export enum Roles {
  /// <summary>
  /// مدير النظام
  /// </summary>
  System_Admin = 'System_Admin',

  /// <summary>
  ///  إدارة اللجان
  /// </summary>
  Committee_Management = 'Committee_Management',

  /// <summary>
  /// الإتصالات الإدارية
  /// </summary>
  Administrative_Communications = 'Administrative_Communications',

  /// <summary>
  ///  الوصول إلى إحصائيات اللجنة
  /// </summary>
  DashboardStatistics_Access = 'DashboardStatistics_Access',

  /// <summary>
  ///  الوصول إلى المعاملات المعتمدة للجنة
  /// </summary>
  AssigendRequests_Access = 'AssigendRequests_Access',

  /// <summary>
  ///  إمكانية تفويض موظف بديل
  /// </summary>
  Delegation_Access = 'Delegation_Access',

  /// <summary>
  ///  إدارة الأقسام
  /// </summary>
  Departments_Management = 'Departments_Management',

  /// <summary>
  ///  إدارة الوحدات
  /// </summary>
  Units_Management = 'Units_Management',

  /// <summary>
  ///  إدارة المواعيد
  /// </summary>
  Appointments_Management = 'Appointments_Management',

  /// <summary>
  /// إعدادات المواعيد
  /// </summary>
  Appointments_Settings_Management = 'Appointments_Settings_Management',

  /// <summary>
  /// إدارة القيم
  /// </summary>
  Values_Management = 'Values_Management',

  /// <summary>
  /// Hospitals Management -  إدارة المستشفيات.
  /// </summary>
  Hospitals_Management = 'Hospitals_Management',

  /// <summary>
  ///  Hospital Manager -   مدير مستشفى.
  /// </summary>
  Hospital_Manager = 'Hospital_Manager',

  /// <summary>
  /// Documents Management -  إدارة الوثائق.
  /// </summary>
  Documents_Management = 'Documents_Management',

  /// <summary>
  /// Committee Management -  إدارة اللجنة.
  /// </summary>
  Committee_Manager = 'Committee_Manager',

  System_Dashboard_Access = 'Dashboard_Access',
  Committee_Dashboard_Access = 'Committee_Dashboard_Access',

  /// <summary>
  /// View Request History - استعراض سجل المعاملات
  /// </summary>
  View_Request_History = 'View_Request_History',

  /// <summary>
  /// View Beneficiary Appointments - مواعيد المستفيدين
  /// </summary>
  View_Beneficiary_Appointments = 'View_Beneficiary_Appointments',
}

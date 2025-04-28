export enum CommitteeReviewEnum {
  /// <summary>
  /// المذكور كلف بمراجعة اللجنة قبل تمكينه من العمل
  /// </summary>
  RequiredToReview = 1,

  /// <summary>
  /// الحالة الصحية للمذكور لا تمكنه من مراجعة اللجنة، وسوف يكلف بمراجعتكم حال استطاعته
  /// </summary>
  HealthConditionDoesNotAllowHimToReview = 2,
}

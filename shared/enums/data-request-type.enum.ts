export enum DataRequestType {
  Access = 'ACCESS',
  Rectify = 'RECTIFY',
  Delete = 'DELETE',
}

export const DataRequestTypeLabel: Record<DataRequestType, string> = {
  [DataRequestType.Access]: 'עיון במידע שנשמר עליי',
  [DataRequestType.Rectify]: 'תיקון מידע שנשמר עליי',
  [DataRequestType.Delete]: 'מחיקת המידע שנשמר עליי',
};

export const DATA_REQUEST_TYPE_ORDER: DataRequestType[] = [
  DataRequestType.Access,
  DataRequestType.Rectify,
  DataRequestType.Delete,
];

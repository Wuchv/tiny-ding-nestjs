export const responseFactory = (
  statusCode: number,
  message: string,
  payload?: any,
): IResponse<any> => ({
  statusCode,
  message,
  payload,
});

export const getRandomChineseWord = () => {
  const _rsl = '';
  const _randomUniCode = Math.floor(
    Math.random() * (40870 - 19968) + 19968,
  ).toString(16);
  eval('_rsl=' + '"\\u' + _randomUniCode + '"');
  return _rsl;
};

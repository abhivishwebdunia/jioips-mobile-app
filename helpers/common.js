const ErrorCodes=[20006,20008];
const SucessCodes=[20001,1];
export function getExtensionFromBase64(v) {
  let imgData = v.split("/");
  let imageData = imgData[1].split(";");
  return imageData[0];
}

export function checkResponse(resp) {
  let response = resp.body || resp;
  let method = resp.method;
  let result: any = { success: false, message: "Some error occured.", data: {}, statusData: {}, statusCode: 0, dataStatusCode: 0 };
  try {
      if (response && response.Response && response.Response.Status) {  
          result['data'] = response.Response.Data || {};
          result['statusData'] = response.Response.Status || {};
          result['statusCode'] = parseInt(response.Response.Status.statusCode);
          result.message = response.Response.Status.statusMessage;
          let statusCode = parseInt(response.Response.Status.statusCode);

          if (SucessCodes.indexOf(response.Response.Status.statusCode) !== -1) {
              result.success = true;
          }
          if (resp.status >= 400) {
              result.success = false;
          }

          if (Array.isArray(result['data'])) {
              if (result['data'] && result['data'].length > 0) {
                  result.message = (result['data'][0]['message'] && result['data'][0]['message'] != "") ? result['data'][0]['message'] : result.message;
                  if (result['data'][0]['status']) {
                      result['dataStatusCode'] = result['data'][0]['status'];

                      if (parseInt(result['data'][0]['status']) === -1 || (parseInt(result['data'][0]['status']) > 20000 && SucessCodes.indexOf(parseInt(result['data'][0]['status'])) === -1) || parseInt(result['data'][0]['status']) === 0 || parseInt(result['data'][0]['status']) === -1) {
                          result.success = false;

                      }
                  }
                  if (result['data'][0]['status'] === 0) {
                      result['dataStatusCode'] = result['data'][0]['status'];
                      result.success = false;

                  }
              }
          } else {
              if (result['data'] && result['data']['message']) {
                  result.message = (result['data']['message'] && result['data']['message'] != "") ? result['data']['message'] : result.message;
                  result['dataStatusCode'] = result['data']['status'];
                  if (result['data']['status'] === 0 || (result['data']['status'] && parseInt(result['data']['status']) > 20000 && SucessCodes.indexOf(parseInt(result['data']['status'])) === -1) || parseInt(result['data']['status']) === 0 || parseInt(result['data'][0]['status']) === -1) {
                      result.success = false;
                  }
              }
          }
      }
  } catch (err) {

  }
  return result;
}

export function checkStatus(statusCode) {
  statusCode = parseInt(statusCode);
  return (SucessCodes.indexOf(statusCode) !== -1);
}
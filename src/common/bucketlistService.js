import instance from "./axios_config";

function getBuckets(data) {
  console.log("token", data.token)
  return instance.request({
    url: '/bucketlists',
    method: 'GET',
    headers:{
      "Authorization": data.token
    }
  }).then(function(response) {
    return response.data
  })
}

const Api = Object.assign({}, {
  getBuckets
})

export default Api;

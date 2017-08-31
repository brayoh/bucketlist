import instance from "./axios_config";

function getBuckets(data) {
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

function addBucket(data) {
  return instance.request({
    url: '/bucketlists',
    method: 'POST',
    headers:{
      "Authorization": data.token
    },
    data: JSON.stringify({
      "name": data.name,
      "description": data.description
    })

  }).then(function(response) {
    return response.data
  })
}

function deleteBucket(data) {
  return instance.request({
    url: '/bucketlists'+ data.bucket_id,
    method: 'DELETE',
    headers:{
      "Authorization": data.token
    }

  }).then(function(response) {
    return response.data
  })
}

const Api = Object.assign({}, {
  getBuckets,
  addBucket,
  deleteBucket
})

export default Api;

import instance from "./axios_config";

function getBuckets(data: Object) {
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

function addBucket(data: Object) {
  return instance.request({
    url: '/bucketlists',
    method: 'POST',
    headers: {
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

function updateBucket(data: Object) {
  return instance.request({
    url: '/bucketlists/' + data.bucket_id,
    method: 'PUT',
    headers: {
      "Authorization": data.token
    },
    data: JSON.stringify({
      "name": data.name,
      "description": data.description,
      "done": data.done
    })

  }).then(function(response) {
    return response.data
  })
}

function deleteBucket(data: Object) {
  return instance.request({
    url: '/bucketlists/'+ data.bucket_id,
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
  updateBucket,
  deleteBucket
})

export default Api;

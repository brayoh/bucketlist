import instance from "./axios_config";


function addItem(data) {
  return instance.request({
    url: `/bucketlists/${data.bucket_id}/items`,
    method: 'POST',
    data: JSON.stringify({
      "name": data.name
    })

  }).then(function(response) {
    return response.data
  })
}

function updateItem(data) {
  return instance.request({
    url: `/bucketlists/${data.bucket_id}/items/${data.item_id}`,
    method: 'PUT',
    data: {
      name: data.name
    }
  }).then(function(response) {
    return response.data
  })
}

function deleteItem(data) {
  return instance.request({
    url: `/bucketlists/${data.bucket_id}/items/${data.item_id}`,
    method: 'DELETE',
  }).then(function(response) {
    return response.data
  })
}

const Api = Object.assign({}, {
  addItem,
  updateItem,
  deleteItem
})

export default Api;

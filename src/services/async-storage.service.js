export const asyncStorageService = {
	query,
	get,
	post,
	put,
	remove,
}

function query(entityType, delay = 1500) {
	var entities = JSON.parse(localStorage.getItem(entityType)) || []
	return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
	try {
		const entities = await query(entityType)
		const entity = entities.find((entity) => entity._id === entityId)
		if (!entity)
			throw new Error(
				`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
			)
		return entity
	} catch (err) {
		console.log('async get had an error: ', err)
	} finally {
		console.log('async get is done')
	}
}

function getOld(entityType, entityId) {
	return query(entityType).then((entities) => {
		const entity = entities.find((entity) => entity._id === entityId)
		if (!entity)
			throw new Error(
				`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
			)
		return entity
	})
}

async function post(entityType, newEntity) {
	newEntity = { ...newEntity }
	newEntity._id = _makeId()
	try {
		const entities = await query(entityType)
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	} catch (err) {
		console.log('async post had an error: ', err)
	} finally {
		console.log('async post is done')
	}
}

function postOld(entityType, newEntity) {
	newEntity = { ...newEntity }
	newEntity._id = _makeId()
	return query(entityType).then((entities) => {
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	})
}

async function put(entityType, updatedEntity) {
	try {
		const entities = await query(entityType)
		const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
		if (idx < 0)
			throw new Error(
				`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
			)
		entities.splice(idx, 1, updatedEntity)
		_save(entityType, entities)
		return updatedEntity
	} catch (err) {
		console.log('async put had an error: ', err)
	} finally {
		console.log('async put is done')
	}
}

function putOld(entityType, updatedEntity) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
		if (idx < 0)
			throw new Error(
				`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
			)
		entities.splice(idx, 1, updatedEntity)
		_save(entityType, entities)
		return updatedEntity
	})
}

async function remove(entityType, entityId) {
	try {
		const entities = await query(entityType)
		const idx = entities.findIndex((entity) => entity._id === entityId)
		if (idx < 0)
			throw new Error(
				`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
			)
		entities.splice(idx, 1)
		_save(entityType, entities)
	} catch (err) {
		console.log('async remove had an error: ', err)
	} finally {
		console.log('async remove is done')
	}
}

function removeOld(entityType, entityId) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === entityId)
		if (idx < 0)
			throw new Error(
				`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
			)
		entities.splice(idx, 1)
		_save(entityType, entities)
	})
}

// Private functions

function _save(entityType, entities) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
	var text = ''
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

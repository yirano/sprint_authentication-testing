exports.seed = async function(knex) {
	await knex('users').insert([
		{
			username: 'newdean',
			password: '$2a$10$bQuHLn.VkflTxFmcOPWV4.EDLhLUarFoVghiGY8iITRaJtat8SdxS'
		}
	])
}

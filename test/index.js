'use strict'

const {join} = require('path')
const {spawn} = require('child_process')
const test = require('ava')

const bin = join(__dirname, '../cli.js')

test.cb('valid', t => {
	spawn(bin, ['vale3'])
		.stdout
		.on('data', buffer => {
			t.regex(buffer.toString('utf8'), /BOV:VALE3/)
			t.end()
		})
})

test.cb('invalid', t => {
	spawn(bin, ['xxx'])
		.stdout
		.on('data', buffer => {
			t.is(buffer.toString('utf8'), '✖ Cotação não encontrada.')
			t.end()
		})
})

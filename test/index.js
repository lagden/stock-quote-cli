'use strict'

import {join} from 'path'
import {spawn} from 'child_process'
import test from 'ava'

const bin = join(__dirname, '../cli.js')

test.cb('valid', t => {
	spawn(bin, ['vale5'])
		.stdout
		.on('data', buffer => {
			t.regex(buffer.toString('utf8'), /BOV:VALE5/)
			t.end()
		})
})

test.cb('invalid', t => {
	spawn(bin, ['xxx'])
		.stdout
		.on('data', buffer => {
			t.is(buffer.toString('utf8'), '✖ Cotação não encontrada')
			t.end()
		})
})

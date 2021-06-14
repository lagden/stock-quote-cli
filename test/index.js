import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {spawn} from 'node:child_process'
import test from 'ava'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cli = path.join(__dirname, '..', 'src', 'cli.js')

test.cb('valid', t => {
	spawn(cli, ['vale3'])
		.stdout
		.on('data', buffer => {
			t.regex(buffer.toString('utf8'), /BOV:VALE3/)
			t.end()
		})
})

test.cb('invalid', t => {
	spawn(cli, ['xxx'])
		.stderr
		.on('data', buffer => {
			t.is(buffer.toString('utf8'), '✖ Ativo não encontrado.')
			t.end()
		})
})

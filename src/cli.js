#!/usr/bin/env node

import program from 'commander'
import Table from 'cli-table2'
import chalk from 'chalk'
import consulta from 'lagden-stock-quote'

const version = '2.0.1'
const _red = chalk.bold.red
const _yellow = chalk.bold.yellow
const _green = chalk.bold.green

function fail(error) {
	process.stderr.write(_red(`✖ ${error.message}`))
	process.exit(1)
}

function show(data) {
	const table = new Table({head: ['', data.papel]})
	const cols = Object.keys(data)
	for (const col of cols) {
		if (col === 'success' || col === 'papel') {
			continue
		}
		const obj = {}
		if (col === 'variacao') {
			obj[_yellow(col)] = /^-/.test(data[col]) ? _red(data[col]) : _green(data[col])
		} else {
			obj[_yellow(col)] = data[col]
		}
		table.push(obj)
	}
	process.stdout.write(table.toString())
	process.exit(0)
}

program
	.version(version)
	.description('Busca informações de um ativo na Bolsa de Valores.')
	.usage('<ativo>')
	.arguments('<ativo>')
	.action(ativo => {
		consulta(ativo)
			.then(show)
			.catch(fail)
	})
	.parse(process.argv)

if (program?.args?.length === 0) {
	program.help()
}

#!/usr/bin/env node

'use strict'

const program = require('commander')
const Table = require('cli-table2')
const chalk = require('chalk')
const consulta = require('lagden-stock-quote')
const {version} = require('./package.json')

const error = chalk.bold.red
const warn = chalk.bold.yellow
const green = chalk.bold.green

function fail(err) {
	process.stdout.write(error(`✖ ${err.message}`))
	process.exit(1)
}

function show(dado) {
	const table = new Table({head: ['', dado.papel]})
	const cols = Object.keys(dado)
	for (let i = 0; i < cols.length; i++) {
		const col = cols[i]
		if (col === 'success' || col === 'papel') {
			continue
		}
		const obj = {}
		if (col === 'variacao') {
			obj[warn(col)] = /^-/.test(dado[col]) ? error(dado[col]) : green(dado[col])
		} else {
			obj[warn(col)] = dado[col]
		}
		table.push(obj)
	}
	process.stdout.write(table.toString())
}

function success(res) {
	show(res)
	process.exit(0)
}

program
	.version(version)
	.description('Busca por informações de um papel na Bolsa de Valores')
	.usage('<input>')
	.arguments('<input>')
	.action(req => {
		consulta(req)
			.then(success)
			.catch(fail)
	})
	.parse(process.argv)

if (program.args && program.args.length === 0) {
	program.help()
}

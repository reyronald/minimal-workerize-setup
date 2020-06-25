// @ts-nocheck

const jsdom = require('jsdom')

const { JSDOM } = jsdom

const dom = new JSDOM(`<!DOCTYPE html>`, { pretendToBeVisual: true })

global.window = dom.window
global.document = dom.window.document
global.Blob = window.Blob
global.FileReader = dom.window.FileReader
global.requestAnimationFrame = dom.window.requestAnimationFrame

require('jsdom-worker')

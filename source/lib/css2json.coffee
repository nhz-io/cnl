AbstractMapper = require 'abstract-mapper'

property = /([-_a-z][-_a-z0-9]*)\s*:\s*(.*\)|.*?)\s*(?=;|\s*$)/gmi
rule = /([-._@a-z][-_a-z0-9]*[^{}]*?)\s*\{([^{}]+|([^{}]+\{[^{}]+\}\s*)+)\}/gmi

declarations = new AbstractMapper [
  ($, result = {}) -> result:result
  ($) -> $.replace property, ($0, name, value) =>
    @result[name] = value
  -> @result
]

rules = new AbstractMapper [
  ($, result = {}) -> result:result
  ($) -> $.replace rule, ($0, name, block) =>
    if (name.substr 0, 1) is '@'
      rules block, (@result[name] ||= {})
    else
      declarations block, (@result[name] ||= {})
  -> @result
]

module.exports = rules

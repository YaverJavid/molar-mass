/* CSSR */
var cssr = {
  KEYWORD: 'cssr',
  ERROR: false,
  DOM_COLLECTION: document.getElementsByTagName('*'),
  USED_CLASSES: [],
  STYLESHEET: '',
  TEMP: {
    CLASS: '',
    PROPERTY: '',
    VALUE: '',
    RULES: [],
    FILTERED_RULES: [],
    ANIMATIONS: [],
    ANIMATION_RULES: [],
    CURRENT_ANIMATION_RULE: '',
    CURRENT_ANIMATION_NAME: '',
    CURRENT_SCRIPT: '',
    CURRENT_SCRIPT_PROPERTY: '',
    CURRENT_SCRIPT_VALUE: '',
    CURRENT_SCRIPTS: '',
    CURRENT_ANIMATION_STAMP: '',
    CURRENT_ANIMATION_STAMPS: [],
    CURRENT_ANIMATION_TIME_STAMP_CONSTANT: 0,
    CURRENT_ANIMATION_TIME_STAMP: 0,

  },
  ANIMATION_FEED: document.querySelector('cssr-anim'),
  ANIMATIONS: ' ',
  STATIC_COLOR: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
  convertProperty: function(value) {
    switch (value) {
      case 'bg':
        return 'background'
      case 'c':
        return 'color'
      case 'm':
        return 'margin'
      case 'p':
        return 'padding'
      case 'b':
        return 'border'
      case 'br':
        return 'border-radius'
      case 'ta':
        return 'text-align'
      case 'h':
        return 'height'
      case 'w':
        return 'width'
      case 'mt':
        return 'margin-top'
      case 'mb':
        return 'margin-bottom'
      case 'mr':
        return 'margin-right'
      case 'ml':
        return 'margin-left'
      case 'pt':
        return 'padding-top'
      case 'pb':
        return 'padding-bottom'
      case 'pr':
        return 'padding-right'
      case 'pl':
        return 'padding-left'
      case 'fs':
        return 'font-size'
      case 'ff':
        return 'font-family'
      case 'bs':
        return 'box-shadow'
      case 'ps':
        return 'position'
      case 'disp':
        return 'display'
      case 'l':
        return 'left'
      case 'r':
        return 'right'
      case 'bt':
        return 'bottom'
      case 't':
        return 'top'
      case 'z':
        return 'z-index'
      case 'jc':
        return 'justify-content'
      case 'fl':
        return 'filter'
      case 'ai':
        return 'align-items'
      case 'as':
        return 'align-self'
      case 'bgi':
        return 'background-image'
      case 'o':
        return 'opacity'
      case 'tr':
        return 'transition'
      case 'tsh':
        return 'text-shadow'
      case 'a':
        return 'animation'
      case 'txtd':
        return 'text-decoration'
      case 'sb':
        return 'scroll-behavior'
      case 'aic':
        return 'animation-iteration-count'
      case 'an':
        return 'animation-name'
      case 'ad':
        return 'animation-duration'
      case 'afm':
        return 'animation-fill-mode'
      case 'ov':
        return 'overflow'
    }
    return value
  },
  parseValue: function(value) {
    return value.replaceAll('_', ' ').replaceAll('H', '#').replaceAll('N', '-').replaceAll('D', `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`).replaceAll('P', '.').replaceAll('CO', ',').replaceAll('T', '%').replaceAll('BS', '(').replaceAll('BE', ')').replaceAll('M', '*').replaceAll('R', Math.random()).replaceAll('A', '+').replaceAll('D', '/').replaceAll('Q', '"').replaceAll('F', cssr.STATIC_COLOR).replaceAll('U', '{').replaceAll('V', '}')
  }
}
for (var i = 0; i < cssr.DOM_COLLECTION.length; i++) {
  cssr.USED_CLASSES.push(...cssr.DOM_COLLECTION[i].classList)
}

cssr.USED_CLASSES = [...new Set(cssr.USED_CLASSES)]
cssr.USED_CLASSES = cssr.USED_CLASSES.filter(e => e.substring(0, 4) === cssr.KEYWORD && e.split('-').length === 3)

for (i = 0; i < cssr.USED_CLASSES.length; i++) {
  cssr.TEMP.PROPERTY = cssr.USED_CLASSES[i].split('-')[1]
  cssr.TEMP.VALUE = cssr.USED_CLASSES[i].split('-')[2]
  cssr.TEMP.CLASS = cssr.USED_CLASSES[i]
  if (cssr.TEMP.VALUE.substring(0, 3) === 'VAR') cssr.TEMP.VALUE = 'var(--' + cssr.TEMP.VALUE.substring(3, cssr.TEMP.VALUE.length) + ')'
  if (cssr.TEMP.VALUE[cssr.TEMP.VALUE.length - 1] === 'I') cssr.TEMP.VALUE = cssr.TEMP.VALUE.replaceAll('I', ' ') + ' !important';
  cssr.TEMP.PROPERTY = cssr.convertProperty(cssr.TEMP.PROPERTY)
  cssr.TEMP.VALUE = cssr.parseValue(cssr.TEMP.VALUE)

  cssr.STYLESHEET += `
  .${cssr.TEMP.CLASS}{
    ${cssr.TEMP.PROPERTY}:${cssr.TEMP.VALUE};
      }
  `
}

if (cssr.ANIMATION_FEED) {
  cssr.ANIMATION_FEED = cssr.ANIMATION_FEED.innerHTML.replaceAll(' ', '')
  cssr.TEMP.RULES = cssr.ANIMATION_FEED.split(/({|})/)
  if (cssr.TEMP.RULES.length > 1) {
    cssr.TEMP.FILTERED_RULES.push(cssr.TEMP.RULES[2]);
    if (cssr.TEMP.RULES.length > 5) {
      for (i = 6; i < cssr.TEMP.RULES.length; i += 4) {
        cssr.TEMP.FILTERED_RULES.push(cssr.TEMP.RULES[i])
      }
    }
  }
  cssr.TEMP.ANIMATIONS = cssr.ANIMATION_FEED.match(/@[a-z/d/-]+/ig)
  for (var i = 0; i < cssr.TEMP.ANIMATIONS.length; i += 1) {
    cssr.TEMP.ANIMATION_RULES.push([...cssr.TEMP.ANIMATIONS[i].split('-')])
  }
  if (cssr.TEMP.ANIMATION_RULES.length === cssr.TEMP.FILTERED_RULES.length) {
    for (var i = 0; i < cssr.TEMP.ANIMATION_RULES.length; i++) {
      cssr.TEMP.CURRENT_ANIMATION_RULE = cssr.TEMP.ANIMATION_RULES[i][0]
      cssr.TEMP.CURRENT_ANIMATION_NAME = cssr.TEMP.ANIMATION_RULES[i][1]
      
      if (cssr.TEMP.CURRENT_ANIMATION_RULE == '@time') {
        cssr.TEMP.CURRENT_SCRIPT = cssr.TEMP.FILTERED_RULES[i].split('][')
        for (var j = 0; j < cssr.TEMP.CURRENT_SCRIPT.length; j++) {
          cssr.TEMP.CURRENT_SCRIPT[j] = cssr.TEMP.CURRENT_SCRIPT[j].replaceAll(']', '').replaceAll('[', '')
          cssr.TEMP.CURRENT_SCRIPTS = cssr.TEMP.CURRENT_SCRIPT[j].split(';')
          for (var k = 0; k < cssr.TEMP.CURRENT_SCRIPTS.length; k++) {
            cssr.TEMP.CURRENT_SCRIPT_PROPERTY = cssr.convertProperty(cssr.TEMP.CURRENT_SCRIPTS[k].split(':')[0])
            cssr.TEMP.CURRENT_SCRIPT_VALUE = cssr.parseValue(cssr.TEMP.CURRENT_SCRIPTS[k].split(':')[1])
            if (k == 0) cssr.TEMP.CURRENT_ANIMATION_STAMP += '{'
            cssr.TEMP.CURRENT_ANIMATION_STAMP += `${cssr.TEMP.CURRENT_SCRIPT_PROPERTY}:${cssr.TEMP.CURRENT_SCRIPT_VALUE};`
            if (k == cssr.TEMP.CURRENT_SCRIPTS.length - 1) cssr.TEMP.CURRENT_ANIMATION_STAMP += '}'
          }
          cssr.TEMP.CURRENT_ANIMATION_STAMPS.push(cssr.TEMP.CURRENT_ANIMATION_STAMP)
          cssr.TEMP.CURRENT_ANIMATION_STAMP = ''
        }
        cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP_CONSTANT = 100 / cssr.TEMP.CURRENT_ANIMATION_STAMPS.length
        for (var j = 0; j < cssr.TEMP.CURRENT_ANIMATION_STAMPS.length; j++) {
          if (j == 0) cssr.ANIMATIONS += `@keyframes ${cssr.TEMP.CURRENT_ANIMATION_NAME}{`
          cssr.ANIMATIONS += `${cssr.TEMP.CURRENT_ANIMATION_STAMPS.length - 1 == j ? '100':cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP}%${cssr.TEMP.CURRENT_ANIMATION_STAMPS[j]}`
          if (j == cssr.TEMP.CURRENT_ANIMATION_STAMPS.length - 1) cssr.ANIMATIONS += '}'
          cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP += cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP_CONSTANT
        }
        cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP = 0
        cssr.TEMP.CURRENT_ANIMATION_STAMPS = []
      } else if (cssr.TEMP.CURRENT_ANIMATION_RULE == '@anim') {
        cssr.TEMP.CURRENT_SCRIPT = cssr.TEMP.FILTERED_RULES[i].split('](')
        for (var j = 0; j < cssr.TEMP.CURRENT_SCRIPT.length; j++) {
          cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP = cssr.TEMP.CURRENT_SCRIPT[j].split(')[')[0].replace('(', ' ')
          cssr.TEMP.CURRENT_ANIMATION_STAMP = cssr.TEMP.CURRENT_SCRIPT[j].split(')[')[1].replace(']', ' ')
          cssr.TEMP.CURRENT_SCRIPTS = cssr.TEMP.CURRENT_ANIMATION_STAMP.split(';')
          for (var k = 0; k < cssr.TEMP.CURRENT_SCRIPTS.length; k++) {
            cssr.TEMP.CURRENT_SCRIPT_PROPERTY = cssr.convertProperty(cssr.TEMP.CURRENT_SCRIPTS[k].split(':')[0])
            cssr.TEMP.CURRENT_SCRIPT_VALUE = cssr.parseValue(cssr.TEMP.CURRENT_SCRIPTS[k].split(':')[1])
            if (j == 0 && k == 0) cssr.ANIMATIONS += `@keyframes ${cssr.TEMP.CURRENT_ANIMATION_NAME}{`
            if (k == 0) cssr.ANIMATIONS += `${cssr.TEMP.CURRENT_ANIMATION_TIME_STAMP}{`
            cssr.ANIMATIONS += `${cssr.TEMP.CURRENT_SCRIPT_PROPERTY} : ${cssr.TEMP.CURRENT_SCRIPT_VALUE};`
            if (k == cssr.TEMP.CURRENT_SCRIPTS.length - 1) cssr.ANIMATIONS += '}'
            if (k == cssr.TEMP.CURRENT_SCRIPTS.length - 1 && j == cssr.TEMP.CURRENT_SCRIPT.length - 1) cssr.ANIMATIONS += '}'
          }
        }
      }
    }
  }
}
document.querySelector('body').innerHTML += `<style>${cssr.STYLESHEET} ${cssr.ANIMATIONS}</style>`
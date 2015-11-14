var vars = {}

// font family - update these when external fonts are setup
vars['sans'] = 'sans-serif'
vars['serif'] = 'serif'

// font sizes generally used on the html element and some mixins
vars['base_font_size'] = '16px'
vars['base_line_height'] = '1.3'

// font weights
vars['light'] = 300
vars['roman'] = 400
vars['regular'] = vars['roman']
vars['normal'] = vars['roman']
vars['medium'] = 500
vars['semibold'] = 600
vars['bold'] = 700

// Breakpoints
vars['portrait'] = '48em'    // based on ipad ~ 768px
vars['landscape'] = '64em'   // based on ipad ~ 1024px
vars['laptop'] = '70em'

// literal colours
vars['green'] = '#C3F3BF'
vars['blue'] = '#69BCE6'
vars['light_grey'] = '#C5C5C5'
vars['medium_grey'] = '#82827F'
vars['dark_grey'] = '#3D3C3A'

// cool 4 school skateboarding colours
vars['daves_green'] = '#80cf53'
vars['daves_red'] = '#F6694C'
vars['daves_orange'] = '#F6A83D'

// abstract colours
vars['foreground'] = 'white'
vars['background'] = 'black'
vars['focus_color'] = vars['blue']
vars['alert_color'] = vars['daves_orange']
vars['error_color'] = vars['daves_orange']
vars['success_color'] = vars['daves_green']

module.exports = vars

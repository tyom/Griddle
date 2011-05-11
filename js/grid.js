$(function(){
    $("<link>")
    .insertAfter('head title')
    .attr({
        'rel': 'stylesheet',
        'type': 'text/css',
        'href': './css/grid.css'
    });
    
    Grid.init();
});

var Grid = {
    container: null,
    wrapper: null,
    state: 'on',
    
    init: function() {
        // grid defaults
        GRIDDLE_SETTINGS = (typeof GRIDDLE_SETTINGS != 'object') ? {} : GRIDDLE_SETTINGS;
        GRIDDLE_SETTINGS.grid_width = GRIDDLE_SETTINGS.grid_width || 960;
        GRIDDLE_SETTINGS.num_cols = GRIDDLE_SETTINGS.num_cols || 12;
        GRIDDLE_SETTINGS.gutter = ( GRIDDLE_SETTINGS.grid_width/ GRIDDLE_SETTINGS.num_cols) / 4;
        GRIDDLE_SETTINGS.col_width = GRIDDLE_SETTINGS.gutter * 3;
        GRIDDLE_SETTINGS.grid_opacity = GRIDDLE_SETTINGS.grid_opacity || .5;
        GRIDDLE_SETTINGS.col_opacity = GRIDDLE_SETTINGS.col_opacity || .5;
        GRIDDLE_SETTINGS.col_colour = GRIDDLE_SETTINGS.col_colour || '#eee';
        GRIDDLE_SETTINGS.gutter_style = GRIDDLE_SETTINGS.gutter_style || 'none'
        
        this.container = $('<div class="griddle-container" />').appendTo('body');
        this.createControls();
        
        this.create();
    },
    
    createControls: function() {
        var controls = $('<div class="griddle-controls" />').appendTo(this.container);
        var toggle = $('<a class="' + this.state + '" />').appendTo(controls);
        
        toggle.text(this.state);
        toggle.click(function() {
            Grid.handleGrid();
            
            $(this)
                .text(Grid.state)
                .attr('class', Grid.state);
        });
    },
    
    handleGrid: function() {
        if(this.state == 'on') {
            this.wrapper.css('opacity', 0);
            // Grid.destroy();
            this.state = 'off';
        } else {
            // Grid.create();
            this.wrapper.css({
                'opacity': GRIDDLE_SETTINGS.opacity
            });
            this.state = 'on';
        }
    },
    
    createCols: function() {
        var i,
            col = $('<div class="griddle-col"/>'),
            gutter = $('<div class="griddle-gutter"/>'),
            cols = $('<div class="griddle-cols" />').appendTo(this.wrapper),
            style = GRIDDLE_SETTINGS.gutter_style;
        
        // columns
        col.css({ 
            'width': GRIDDLE_SETTINGS.col_width,
            'background': GRIDDLE_SETTINGS.col_colour,
            'opacity': GRIDDLE_SETTINGS.col_opacity
        });
        
        // column outlines
        if(GRIDDLE_SETTINGS.col_outline) {
            col.css({ 
                'box-shadow': '0 0 0 1px ' + GRIDDLE_SETTINGS.col_line_colour
            });
        }
        // gutter
        gutter.css({
            'width': GRIDDLE_SETTINGS.gutter,
        });
        
        // gutter style
        if(typeof style == 'string' && style !== 'line') {
            gutter.css({ 'background': style });
        } else {
            gutter.css({ 
                    'background': 'none',
                    'margin-right': GRIDDLE_SETTINGS.gutter/2,
                    'width': GRIDDLE_SETTINGS.gutter/2,
                    'box-shadow': '1px 0 0' + GRIDDLE_SETTINGS.col_line_colour
                });
        }
        
        for (i=0; i < GRIDDLE_SETTINGS.num_cols; i++) {
                gutter.clone().appendTo(cols);
                col.clone().appendTo(cols);
        };
        gutter.clone().appendTo(cols);
        cols.find('.griddle-gutter:first').css({'margin-left': -(GRIDDLE_SETTINGS.gutter/2), 'box-shadow': 'none' });
        cols.find('.griddle-gutter:last').css({'margin-right': -(GRIDDLE_SETTINGS.gutter/2), 'box-shadow': 'none' });
    },
    
    createRows: function() {
        var col = $('<div class="griddle-row" />')
                    .css({
                        'height': $('body').css('line-height'),
                        'border-bottom': '1px solid ' + GRIDDLE_SETTINGS.row_line_colour
                    });
        var rows = $('<div class="griddle-rows" />').appendTo(this.wrapper);
        for (var i=0; i < 100; i++) {
            col.clone().appendTo(rows);
        };
    },
    
    create: function() {
        this.wrapper = $('<div class="griddle-wrapper" />')
                        .css('box-shadow', '0 0 0 1px ' + GRIDDLE_SETTINGS.col_line_colour)
                        .appendTo(this.container)
                        .width(GRIDDLE_SETTINGS.grid_width);
                        
        if(GRIDDLE_SETTINGS.position == 'background') {
            this.container.css({ 
                'z-index': '-1'
            });
        }
        if(GRIDDLE_SETTINGS.align == 'left') {
            this.wrapper.css({ 
                'left': '0',
                'margin-left': 0
            });
        } else if(GRIDDLE_SETTINGS.align == 'right') {
            this.wrapper.css({ 
                'left': 'auto',
                'right': 0,
            });
        } else {
            this.wrapper.css({ 
                'left': '50%',
                'margin-left': -(GRIDDLE_SETTINGS.grid_width/2)
            });
        }
        
        this.createCols();
        if(GRIDDLE_SETTINGS.vertical_rhythm) {
            this.createRows();
        }
        
        setTimeout(function() {
            Grid.wrapper.css('opacity', GRIDDLE_SETTINGS.grid_opacity);
        }, 500)
    },
    
    destroy: function() {
        if(this.wrapper) {
            this.wrapper.remove();
        }
    }
}
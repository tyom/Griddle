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
        this.container = $('<div class="grille-container" />').appendTo('body');
        this.createControls();
        
        this.create();
    },
    
    createControls: function() {
        var controls = $('<div class="grille-controls" />').appendTo(this.container);
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
            this.wrapper.css('opacity', GRILLE_SETTINGS.opacity);
            this.state = 'on';
        }
    },
    
    createCols: function() {
        var col = $('<div class="col"><div class="inner" /></div>');
        var cols = $('<div class="cols" />').appendTo(this.wrapper);
        for (var i=0; i < GRILLE_SETTINGS.num_cols; i++) {
                var margin = GRILLE_SETTINGS.gutter/2;
                col.clone()
                    .css({
                        'padding-left': margin,
                        'padding-right': margin,
                        'width': GRILLE_SETTINGS.col_width
                    })
                    .find('.inner')
                        .css({
                            'width': GRILLE_SETTINGS.col_width
                        })
                    .end()
                    .appendTo(cols);
        };
    },
    
    createRows: function() {
        var col = $('<div class="row" />')
                    .css({
                        'height': $('body').css('line-height')
                    });
        var rows = $('<div class="rows" />').appendTo(this.wrapper);
        for (var i=0; i < 100; i++) {
            col.clone().appendTo(rows);
        };
    },
    
    create: function() {
        this.wrapper = $('<div class="grille-wrapper" />')
                        .appendTo(this.container)
                        .width(GRILLE_SETTINGS.grid_width);
                        
        if(GRILLE_SETTINGS.position == 'background') {
            this.container.css({ 
                'z-index': '-1'
            });
        }
        if(GRILLE_SETTINGS.align == 'left') {
            this.wrapper.css({ 
                'left': '0',
                'margin-left': 0
            });
        } else if(GRILLE_SETTINGS.align == 'right') {
            this.wrapper.css({ 
                'left': 'auto',
                'right': 0,
            });
        } else {
            this.wrapper.css({ 
                'left': '50%',
                'margin-left': -(GRILLE_SETTINGS.grid_width/2)
            });
        }
        
        this.createCols();
        this.createRows();
        
        setTimeout(function() {
            Grid.wrapper.css('opacity', GRILLE_SETTINGS.opacity);
        }, 500)
    },
    
    destroy: function() {
        if(this.wrapper) {
            this.wrapper.remove();
        }
    }
}
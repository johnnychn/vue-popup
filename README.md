# vue-popup
popup for vue.js

require underscore and css-builder

# setting
mask-close Boolean true

z-index default 100

title string default '';

title-color string default '#000';

title-background string default '#fff';

title-border string default '#000';

title-border-bottom string default '#000';

close-button Boolean true;

close-color string default '#fff';

content-background string default '#000';

content string default '';

button-background string default '#337ab7';

button-color string default '#fff';

button-border string default '1px solid #2e6da4';

confirm-button string default 'OK';

cancel-button string default 'Cancel';

popup Object default  {show: false, shaking: false};

transition-object string default "{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s',},enter:{'transition-delay': '.2s',opacity:0,y:100},leave:{'transition-delay': '.0s',opacity:0,y:20,scale:1}}";


#Event
popup-close callback on close

popup-confirm callback on confirm

popup-cancel callback on cancel
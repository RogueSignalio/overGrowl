DEMO: https://roguesignalio.github.io/overGrowl/

Authors: BlackRogue01 & Carolina123
Copyright: RogueSignal.io, 2022 - http://wwww.roguesignal.io
Note:  Uses inline Blueimp MD5: https://github.com/blueimp/JavaScript-MD5

Use:
  <script src="growler.js"></script>
  <script>
    // Instantiates two different growlers
    var ogrowler, ogrowler2, overgrowler3
    document.addEventListener("DOMContentLoaded", () => { 
      ogrowler = new OverGrowl();
      ogrowler2 = new OverGrowl({public: 'growler2', unique: false, duration: 2000, fade: 0});
      ogrowler3 = new OverGrowl();
    })
  </script>
  ...

OverGrowl Config Options (all optional):
  duration: How long the notice is displayed for (ms)
  fade: Fade duration (ms)
  unique: true/false if duplicate messages are allowed on screen at the same time.
  offset_x: Pixels to offset from right side towards left.
  offset_y: Pixels to offset from top towards bottom
  close_button: True | False (default), otherwise click bubble closes, unless no_close == true.
  no_close: True | False (default), Bubble cannot be closed.
  text_select: all | none (default), On click into text area, auto select all text.  USeful for error message copying.
  css: Append attached css, overriding the base css as needed.
  type_config: { <type>: { <Options> }} Where options can be used to set type options (see below) per type.
  public: global root name for DOM and CSS component, default = 'growler'.  Using the same name across instances will use same CSS etc.
  el: Name of the root dom element to create or use.  Default is = 'overgrowl'

Examples:
  overgrowl.success('Happy meow!')
  overgrowl.alert('Sad meow!')
  overgrowl.growl('Just meow!')
  overgrowl.growl_type('error','Broken meow!')

Built in types are:
  growl - Same as '*' (see below)
  error - Styled as an error notice
  alert - Styled as an alert notice
  info - Styled as an informational notice
  success = Styles as a successful notice
  system - Styled as a system notice
  * - Any other type or no type is basic styled.

New types can be created with styling (or without):
  ogrowler.apply_style('yelp',`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      background-image: url('assets/overgrowl-gear.png')
      background-size: cover
    `)

Styling can be updated with:

  ogrowler.apply_style('system',`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      width: 30px;
      height: 30px;
      background-image: url('assets/overgrowl-gear.png');
      background-size: cover;
    `)

Options can be passed to any of the growler message calls:
  duration: How long the notice is displayed for (ms)
  fade: Fade duration (ms)
  unique: true/false if duplicate messages are allowed on screen at the same time.
  close_button: True | False (default), otherwise click bubble closes, unless no_close == true.
  no_close: True | False (default), Bubble cannot be closed.

Other options that will have a more global effect are:
  offset_x: Pixels to offset from right side towards left.
  offset_y: Pixels to offset from top towards bottom
  css: Append attached css, overriding the base css as needed.

The latter list may cause undesired visual effects, so be aware you should set them on
instantiation.

Notes:
* Unique feature is not available across instances of growler component
* Clicking on growl will remove the message immediately.

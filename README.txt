DEMO: https://roguesignalio.github.io/overGrowl/

Authors: BlackRogue01 & Carolina123
Copyright: RogueSignal.io, 2022 - http://wwww.roguesignal.io
Note:  Uses inline Blueimp MD5: https://github.com/blueimp/JavaScript-MD5

* Default images and style all embedded in one JS file.
* Timing options & programmatic style overrides.
* Expand with new types beyond alert,error,info,success,system and basic.
* Prevents (by default) duplication of messages in view.
* HTML content enabled.  
* Option for text auto select for easy copying.
* Close with bubble clock, and/or close "X" button, and/or timed close
* Easily floats left, right, or embed in element.
* And much more - View this source for examples init

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
  duration: How long the notice is displayed for (ms).  0 means leave it until closed.
  fade: Fade duration (ms)
  unique: True | False = If duplicate messages are allowed on screen at the same time.
                          * Unique feature is not available across instances of growler instances.
  offset_x: Pixels to offset from right side towards left.  Default is 20px, unless 'el' is set to element in page.
  offset_y: Pixels to offset from top towards bottom.  Default is 20px, unless 'el' is set to element in page.
  close_button: True | False (default) = Adds a closed button, otherwise click bubble closes, unless no_close == true.
  no_close: True | False (default) = Bubble cannot be closed by clicking on it.  Could get you in trouble.
  text_select: all | auto (default) | none = On click into text area, select all text. Useful for error message copying.
                                            Deafult behavior (auto) is if growl has close button, enable select all text on click.  When enabled, clicking text will not close bubble.
  css: Append attached css, overriding the base css as needed.
  type_config: { <type>: { <Options> }} Where options can be used to set type options (see below) per type.
  public: global base name for DOM and CSS components used by this instance, default = 'growler'.  Using the same name across instances will use the CSS of that name.
  el: Name of the root dom element to create or use.  Default is = 'overgrowl'.  MUST also define 'public' to something besides 'growler'.  Setting this will also act as if 'inline' is set to false.
  inline: true (default) | false = This decouples a growl instance notifications from being inside the default container.  MUST also define 'public' to something besides 'growler'.

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

Options can be passed to any of the growler message calls:
  duration: See above options.
  fade: See above options.
  unique: See above options.
  close_button: See above options.
  no_close: See above options.
  text_select: See above options.

Other options that will have a more global effect are:
  offset_x: See above options.
  offset_y: See above options.
  css: Append attached css, overriding the base css as needed.

The latter list may cause undesired visual effects, so be aware you should set them on
instantiation.

New types can be created with styling (or without):
  growly.add_type('yelp',{ },`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      background-image: url('assets/overgrowl-gear.png')
      background-size: cover
    `)

Styling can be updated with:

  growly.apply_style('system',`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      width: 30px;
      height: 30px;
      background-image: url('assets/overgrowl-gear.png');
      background-size: cover;
    `)

Other methods:
  .add_type(type_name,[options],[bubble_css],[icon_css]) // Create a new growl type with optional options and styles.
      * Warning.  A new method is added to the instance of type_name, so don't be a dork and check the instance for
        existing type_name as an attribute or method.
  .apply_type_style(type_name,[bubble_css],[icon_css]) // Apply a new style to a growl type.
  .apply_css(css_style_name, css_text) // Append css to named style sheet.
  .append_css(css_text) // Appends any old css
  .reset_css() // Resets applied and appended CSS that is not type specific.
  .clearGrowls () // Clear ALL visible growls for an instance.
  .removeGrowl(growlElement,[options]) // Removes a specific growl (see instance attributes .growls) with optional settings
                                       // that would effect things like fade.  Well, pretty much fade.
Useful Attributes:
  .element // Top element of growl instance.  Default is a dissassociated container layout wise.
  .parent // Container of growls for this instance in the layout.
  .growls // Array of current, visible growls.  Could be useful (with .removeGrowl()) if you chose 'no_close' and no 'close_button' options.



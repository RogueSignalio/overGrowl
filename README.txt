OverGrowl - Simple, clean, flexible & customizable Growler library.
 ---------------------------------------------------------------------------
 Authors: BlackRogue01 (donovan@roguesignal.io)
 Copyright: RogueSignal.io, wwww.roguesignal.io, 2022
 License: MIT
 Embedded MD5 Function: Blueimp - https://github.com/blueimp/JavaScript-MD5
---------------------------------------------------------------------------
Simple, clean, flexible, standalone & customizable Growler library.  

For those uninitiated, "growls" are overlay pop-up messages to provide errors, success, or whatever
messages needed for the UI that don't have to be embedded in the UI flow and
disrupt the interface.  

At RogueSignal.io, We use them often to convey notices, errors, success from websocket
broadcasts, where you can't guarantee the user is still on the initiating page or you have
background jobs that just run and need to notify the user after some process has finished.

They are great for providing feedback to form errors, providing success on automatic data 
edit saves, and background process or webhook messages like "Your payment has been processed", 
"Your email has been delivered", "Your reports have been generated", and the like.

DEMO: https://roguesignalio.github.io/overGrowl/

Some Features:

* Default images and style all embedded in one JS file, or use external style sheet.
* Timing options and programmatic style overrides.
* Expand with new types beyond alert,error,info,success,system and basic.
* Prevents (by default) duplication of messages in view.
* HTML content enabled.
* Option for text auto select for easy copying.
* Close with bubble clock, and/or close "X" button, and/or timed close
* Easily floats left, right, or embed in element and always sticks to the top of viewport.
* And much more - View this source for examples init

JS Deliver: 
  https://cdn.jsdelivr.net/gh/RogueSignalio/overGrowl@[version]/over_growl.min.js
  https://cdn.jsdelivr.net/gh/RogueSignalio/overGrowl@[version]/over_growl.js
  Version as of this document is v1.2.2, but check releases for latest.  You can
  also use the word "latest", but this will of course cause new features, bugs, and
  changes to magically arrive in your project, so not recommended.

NPM:
  Nope.  The npm craze is fine and all, but I prefer small scripts to have small
  footprints.  Someone else is welcome to make an npm package for this and I will
  happily merge it.

Use:
  <script src="over_growl.js"></script>
  <script>
    // Instantiates different growlers for example.  You probably just need one.
    var ogrowler, ogrowler2, overgrowler3
    document.addEventListener("DOMContentLoaded", () => { 
      ogrowler = new OverGrowl();
      ogrowler2 = new OverGrowl({public: 'growler2', unique: false, duration: 2000, fade: 0});
      ogrowler3 = new OverGrowl();
    })
  </script>
  ...

OverGrowl Config Options (all optional):
  duration:   How long the notice is displayed for (ms).  0 means leave it until closed.
  fade:   Fade duration (ms)
  unique:   True | False = If duplicate messages are allowed on screen at the same time.
                          * Unique feature is not available across instances of growler instances.
  offset_x:   Pixels to offset from right side towards left.  Default is 20px, unless 'el' is set to element in page.
  offset_y:   Pixels to offset from top towards bottom.  Default is 20px, unless 'el' is set to element in page.
  max_height:   Normally calculated to fit comofrtably in the window, but can be set to a static number of pixels.
  close_button:   true | false (default) = Adds a closed button, otherwise click bubble closes, unless no_close == true.
  no_close:   true | false (default) = Bubble cannot be closed by clicking on it.  Could get you in trouble.
  text_select:  all | auto (default) | none = On click into text area, select all text. Useful for error message copying.
                                            Deafult behavior (auto) is if growl has close button, enable select all text on click.  When enabled, clicking text will not close bubble.
  css:  Append attached css, overriding the base css as needed.
  type_config:  { <type>: { <Options> }} Where options can be used to set type options (see below) per type.
  name:   global base name for DOM and CSS components used by this instance, default = 'growler'.  Using the same name across instances will use the CSS and top parent element of that name.
  target:   Name of the root dom element to create or use.  Default is 'overgrowl'.  Unless provided, name will equal 
            'og_<target>'.  Setting this will also act as if 'inline' is set to false.
  inline: true (default) | false = When set to true, will place the growl notices into the default growl notice container and queue.  Setting this to false will, without designating target, will create a new queue within the top level element of 'overgrowler'.
  banner: true (default) | false = Turns on full display width mode for the instance.  If you use this in a secondary instance and don't turn inline = false, then any instance that uses the default target will turn into banner.  We recommend turning inline off (false).

Examples:
  overgrowl.success('Happy meow!')
  overgrowl.alert('Sad meow!')
  overgrowl.growl('Just meow!')
  overgrowl.growl_type('error','Broken meow!')

Built in types are:
  growl - Same as '*' (see below)
  basic - Same as '*' (see below)
  negative - Basically opposite of default basic.
  alert - Styled as an alert notice
  error - Styled as an error notice
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
  icon_flicker: See above options.
  flicker: See above options.
  max_height: See above options.

Other options that will have a more global effect are:
  offset_x: See above options.
  offset_y: See above options.
  css: Append attached css, overriding the base css as needed.

New types can be created with styling (or without):
  growly.add_type('yelp',{ },`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      background-image: url('assets/overgrowl-gear.png')
      background-size: cover
    `
  )
  Then use:
  growly.growl_type('yelp','I have been bitten by a bug!')
  or
  growly.og_yelp('It was a really big bug!')

Styling can be updated with:

  growly.apply_style(<growl type>,[notice_css],[icon_css],[raw_css])
  growly.apply_style('system',`
      border-color: rgb(255, 37, 137);
      background-color: #ffffbb;
    `,`
      animation: system-rotate 3s infinite linear;
      width: 30px;
      height: 30px;
      background-image: url('assets/overgrowl-gear.png');
      background-size: cover;
    `,`
      @keyframes system-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `)

Other methods:
  .add_type(type_name,[options],[notice_css],[icon_css],[text_css],[raw_css])
      Create a new growl type with options and styles.  CSS can be defined as parameters, or options (notice_css, text_css, icon_css, raw_css).
      Notice!!!: A new method is added to the growler instance, called 'og_<type_name>', or you can still call
      growl_type, growl, and growler methods.
  .apply_type_style(type_name,[notice_css],[icon_css],[text_css],[raw_css])
      Apply a new style to a growl type.
  .apply_css(css_style_name, css_text)
      Append css to named style sheet.
  .append_css(css_text)
      Appends any old css
  .reset_css()
      Resets applied and appended CSS that is not type specific.
  .clearGrowls()
      Clear ALL visible growls for an instance.
  .removeGrowl(growlElement,[options])
      Removes a specific growl (see instance attributes .growls) with optional settings
      that would effect things like fade.  Well, pretty much fade.

Note on runtime CSS modification: You may cause undesired visual effects, so be aware the order you apply changes may be important.  Every growl inherits the base style, so if you create an incomplete style for, say a new type, and then change the underlying base style, your new instance will change underneath it.  The solution to this is easy.  Modify the base style first, then the overlay style, in setup of the OverGrowl instance(s).  An example of this issue can be seen from the demo page (linked above), it you click the new "thinking" type buttons from the lowest one first, then the top one.

Useful Attributes:
  .name
      The instance "name" used to distinguish styles for that instance.
  .target
      The id of the element the instance is rendering into.
  .element
      Top element of growl instance.  Default is a dissassociated container layout wise.
  .parent
      Container of growls for this instance in the layout.
  .growls
      Array of current, visible growls.  Could be useful (with .removeGrowl()) if you chose 'no_close' and no 'close_button' options.

OverGrowl without the inline CSS?:
  Don't like the chunky CSS being in the JS file?  Well, you can get rid of it, but every instance of a growler has a "name", set optionally by the "public" option.

  Well, here is what you probably need to do:

  1.> Download over_growl.js and change default_style() to something like:
          default_style() {
            return ''
          }
  2.> Make your own style sheet, but be aware, overGrowl tries to apply "growler-" styles and then "<name>-" styles.  Different instances of over_growl have custom names, to track to generated html elements.  So, you will want to look at the default styles and replace ${this.name} with "growler" to sneak in as the default style for all instances.
  You can also get the over_growl default css from <instance>.default_style() and save that to a .css file, and then change this.name to "growler".  Obviously do this before step #1 if this is the path you want to take.

  3.> Some of the css modification calls, like og_instance.reset_css() and maybe other css calls, may not work sometimes or at all.  Don't know, did minimal testing.  If it turns out to be an issue, I may change my approach and layer styles on default, but currently, some things will just break it if you extract the styles from the JS.  Life is always trade offs.

Todo:

  Feel like making this better?  Well, first of all, this thing has grown a lot and I am not really a JS programmer by day.  Want to show me "how it is done"?  Please do.  However, the following is a list that I would like to put more work into someday ... or have someone do it.

  * Have our in-house UI person cleanup and fix CSS issues.  Man, I hate CSS.
  * More code comments.
  * Add npm stuffz...
  * Allow disable auto copy to clipboard message.
  * Ability to add classes by name to notice,text,and icon elements.
    * Ability to add transitory classes, aka, when the growl fades, the style info is gone
  * Test style class also doesn't have a way to easily append or make new for new types.
  * CSS testing, possibly alongside making sure external css sheets have more support.
  * Maybe some more built-in animation support besides height/fades.  Slide in, fall in, rise in, grow in... whatever.
  * Better default styles.

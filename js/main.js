$(document).ready(function(){
  counterStep = "step0";
  $('.step0').addClass('show');
  $('.show').addClass('in');

  function stepForward(aCurrentStep , aNextStep){
    /*Steps to make the transition animation
      + Move the current animation OUT
      + When OUT animation is finished, hide the current step form
      + Add +1 to currentStep counter
      + Show the current step form using the SHOW class
      + Use the new step form and call the IN animation
    */
    currentForm = $(".show");
    currentForm.addClass('out');
    currentForm.removeClass('in');

    setTimeout(function(){
      if(nextStep==="step3"){
        if(counterStep==="step2a"){
          // Make Calculations to render on step3
          hour = $("select[name='hour'].select-step2a option:selected").text();
          minute= $("select[name='minute'].select-step2a option:selected").text();
          timelapse = $("select[name='timelapse'].select-step2a option:selected").text();
          timeString = hour.concat(":",minute," "+timelapse);
          formatTime = "hh:mm A";
          message= "<p>If you want to wake up at <span class='green bold'>"+timeString+"</span> you should try to <span class='red bold'>fall asleep</span> at one of the following times: </p>";

          /*NOTE: "Sleep Cycles Theory" recommends to sleep 5-6 cycles (each one of 90 minutes),
            less cycles are acceptable but might reduce the efficiency of the method.

           For this reason there 4 alternative to show:
            - badtime = 3 cycles (works but not recommended)
            - normalTime = 4 cycles
            - goodTime = 5 cycles  (works good)
            - greatTime = 6 cycles (recommended by experts)*/

          // The calculations for Step2a format will be:
          normalTime = moment(timeString, formatTime).subtract(90*3,'m').format(formatTime);
          goodTime = moment(timeString, formatTime).subtract(90*4,'m').format(formatTime);
          betterTime = moment(timeString, formatTime).subtract(90*5,'m').format(formatTime);
          bestTime = moment(timeString, formatTime).subtract(90*6,'m').format(formatTime);
        }
        else{
          // Make Calculations to render on step3
          hour = $("select[name='hour'].select-step2b option:selected").text();
          minute= $("select[name='minute'].select-step2b option:selected").text();
          timelapse = $("select[name='timelapse'].select-step2b option:selected").text();
          timeString = hour.concat(":",minute," "+timelapse);
          formatTime = "hh:mm A";
          message= "<p>If you plan to fall asleep at <span class='green bold'>"+timeString+"</span> you should try to <span class='red bold'>wake up</span> at one of the following times: </p>";
          // The calculations for Step2b format will be:
          normalTime = moment(timeString, formatTime).add(90*3,'m').format(formatTime);
          goodTime = moment(timeString, formatTime).add(90*4,'m').format(formatTime);
          betterTime = moment(timeString, formatTime).add(90*5,'m').format(formatTime);
          bestTime = moment(timeString, formatTime).add(90*6,'m').format(formatTime);
        }
      }
      counterStep = aNextStep;
      currentForm = $("."+counterStep);
      currentForm.addClass('show');
      currentForm.addClass('in');
      currentForm.removeClass('out');
      if(counterStep === "step3")
      {
        step3Calc(message,normalTime,goodTime,betterTime,bestTime);
      }
    }, 300);
  }

  function step3Calc(aMessage,aNormalTime,aGoodTime,aBetterTime,aBestTime){
    resultString = aMessage.concat("<div class='collection'><a href='' class='collection-item'><span class='new badge green darken-1' data-badge-caption='BEST'></span>"+bestTime+"</a> <a href='' class='collection-item'><span class='new badge light-green darken-1' data-badge-caption='BETTER'></span>"+betterTime+"</a> <a href='' class='collection-item'><span class='new badge lime darken-1' data-badge-caption='GOOD'></span>"+goodTime+"</a> <a href='' class='collection-item'><span class='new badge deep-orange darken-1' data-badge-caption='NORMAL'></span>"+normalTime+"</a> </div>");
    $(".results").prepend(resultString);
  }

  $("button").click(function(){
    // Allow to navigate to other steps
    nextStep = $(this).data('nextstep');
    // If the button is restar, sleepo have to be resetted
    if(nextStep==="step0")
      location.href = "index.html";

    //Move forward on those steps which dont require
    //any special calculation (step0 step1)
    if(nextStep!=="step3")
      stepForward(counterStep,nextStep);

    // For thos steps which require calculations, we must first
    //validate its datafields to then use stepForward function
    if(nextStep==="step3")
    {
      // Validate if all data field on Step2a were set
      if(counterStep==="step2a"){
        correctFlag = true; // Asume all fields are set correctly
        allSelect = $("select.select-step2a");
        for(i=0; i<allSelect.length; i++){
          if(allSelect[i].value === ""){
            correctFlag = false;
          }
        }
        if(!correctFlag){
          alert("ERROR: Please enter a valid wake up time !");
        }
        else {
          stepForward(counterStep,nextStep);
        }
      }

      // Validate if all data field on Step2b were set
      if(counterStep==="step2b"){
        correctFlag = true; // Asume all fields are set correctly
        allSelect = $("select.select-step2b");
        for(i=0; i<allSelect.length; i++){
          if(allSelect[i].value === ""){
            correctFlag = false;
          }
        }
        if(!correctFlag){
          alert("ERROR: Please enter a valid sleep time !");
        }
        else {
          stepForward(counterStep,nextStep);
        }
      }

    }
  });

  // Add the materialize behavior to select items
  $(document).ready(function() {
    $('select').material_select();
  });

});

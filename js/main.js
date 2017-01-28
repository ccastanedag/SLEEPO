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
      counterStep = aNextStep;
      currentForm = $("."+counterStep);
      currentForm.addClass('show');
      currentForm.addClass('in');
      currentForm.removeClass('out');
    }, 300);


  }
  $("button").click(function(){
    // Allow to navigate to other steps
    nextStep = $(this).data('nextstep');

    //Move forward on those steps which dont require
    //any special calculation (step0 step1)
    if(nextStep!=="step3a" && nextStep!=="step3b")
      stepForward(counterStep,nextStep);

    // For thos steps which require calculations, we must first
    //validate its datafields to then use stepForward function
    if(nextStep==="step3a")
    {
      // Validate if all data field on Step 2a were set
      correctFlag = true; // Asume all fields are set correctly
      allSelect = $("select.select-step2a");
      for(i=0; i<allSelect.length; i++){
        if(allSelect[i].value === ""){
          correctFlag = false;
        }
      }
      if(!correctFlag){
        alert("ERROR: Please enter the time you want to wake up");
      }
      else {
        //TODO: Make Calculations to render on step 3a
        hour = $("select[name='hour'].select-step2a option:selected").text();
        minute= $("select[name='minute'].select-step2a option:selected").text();
        timelapse = $("select[name='timelapse'].select-step2a option:selected").text();
        timeString = hour.concat(":",minute," "+timelapse);
        formatTime = "hh:mm A";

        /*NOTE: "Sleep Cycles Theory" recommends to sleep 5-6 cycles (each one of 90 minutes),
          less cycles are acceptable but might reduce the efficiency of the method.

         For this reason there 4 alternative to show:
          - badtime = 3 cycles (works but not recommended)
          - normalTime = 4 cycles
          - goodTime = 5 cycles  (works good)
          - greatTime = 6 cycles (recommended by experts)*/

        badTime = moment(timeString, formatTime).subtract(90*3,'m').format(formatTime);
        normalTime = moment(timeString, formatTime).subtract(90*4,'m').format(formatTime);
        goodTime = moment(timeString, formatTime).subtract(90*5,'m').format(formatTime);
        greatTime = moment(timeString, formatTime).subtract(90*6,'m').format(formatTime);

        alert("Bad: "+badTime+"\n"+"Normal: "+normalTime+"\n"+"Good: "+goodTime+"\n"+"Great: "+greatTime+"\n");
        stepForward(counterStep,nextStep);
      }
    }

    if(nextStep==="step3b")
    {
      // Validate if all data field on Step 2b were set
      correctFlag = true; // asume all fields are set correctly
      allSelect = $("select.select-step2b");
      for(i=0; i<allSelect.length; i++){
        if(allSelect[i].value === ""){
          correctFlag = false;
        }
      }
      if(!correctFlag){
        alert("ERROR: Please enter the time you plan to fall asleep");
      }
      else {
        //TODO: Make Calculations to render on step 3b
        hour = $("select[name='hour'].select-step2b option:selected").text();
        minute= $("select[name='minute'].select-step2b option:selected").text();
        timelapse = $("select[name='timelapse'].select-step2b option:selected").text();
        alert("Los datos capturados son: "+hour+":"+minute+" "+timelapse);
        stepForward(counterStep,nextStep);
      }
    }
  });

  // Add the materialize behavior to select items
  $(document).ready(function() {
    $('select').material_select();
  });

});

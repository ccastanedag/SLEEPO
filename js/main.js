$(document).ready(function(){
  counterStep = "step0";
  $('.show').addClass('in');

  function stepForward(aCurrentStep , aNextStep){
    /*Steps to make the transition animation
      + Move the current animation OUT
      + When OUT animation is finished, hide the current step form
      + Add +1 to currentStep counter
      + Show the current step form using the SHOW class
      + Use the new step form and call the IN animation
    */
    // alert("Estoy en el paso "+aCurrentStep+" y me voy al paso "+aNextStep);
     currentForm = $(".show");
     currentForm.addClass('out');
     currentForm.removeClass('in');

     setTimeout(function() {
      currentForm.removeClass('show');

      counterStep = aNextStep;
      currentForm = $("."+counterStep);
      currentForm.addClass('show');
      currentForm.addClass('in');
      currentForm.removeClass('out');
    }, 500);


  }

  $("button").click(function(){
    nextStep = $(this).data('nextstep');
    stepForward(counterStep,nextStep);
  });

});

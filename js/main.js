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
  
  // Allow to navigate to other steps
  $("button").click(function(){
    nextStep = $(this).data('nextstep');
    stepForward(counterStep,nextStep);
  });

  // Add the materialize behavior to select items
  $(document).ready(function() {
    $('select').material_select();
  });

});

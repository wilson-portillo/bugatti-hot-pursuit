$(document).ready(function() {

  let anim_id;

  /***Local variables containing elements from the dom***/

  const container = $('#container');
  let car = $('#car');
  let cop_1 = $('#cop_1');
  let cop_2 = $('#cop_2');
  let cop_3 = $('#cop_3');
  let line_1 = $('#line_1');
  let line_2 = $('#line_2');
  let line_3 = $('#line_3');
  let restart_div = $('#restart_div');
  let restart_btn = $('#restart');
  let score = $('#score');


  /*********************************************************************
  * LOCAL VARIABLES CONTAINING CAR, CONTAINER SIZES AND INITIAL SETUP***/
  //saving some initial setup

  let container_left = parseFloat(container.css('left'));
  let container_width = parseFloat(container.width());
  let container_height = parseFloat(container.height());
  let car_width = parseFloat(car.width());
  let car_height = parseFloat(car.height());

  //some other declarations
  let game_over = false;

  let score_counter = 1;

  let speed = 5;
  let line_speed = 7;

  let move_right = false;
  let move_left = false;
  let move_up = false;
  let move_down = false;

        /* Move the bugatti */
  $(document).on('keydown', function(e) {
      if (game_over === false) {
          let key = e.keyCode;
          if (key === 37 && move_left === false) {
              move_left = requestAnimationFrame(left);
          } else if (key === 39 && move_right === false) {
              move_right = requestAnimationFrame(right);
          } else if (key === 38 && move_up === false) {
              move_up = requestAnimationFrame(up);
          } else if (key === 40 && move_down === false) {
              move_down = requestAnimationFrame(down);
          }
      }
  });

  $(document).on('keyup', function(e) {
      if (game_over === false) {
          let key = e.keyCode;
          if (key === 37) {
              cancelAnimationFrame(move_left);
              move_left = false;
          } else if (key === 39) {
              cancelAnimationFrame(move_right);
              move_right = false;
          } else if (key === 38) {
              cancelAnimationFrame(move_up);
              move_up = false;
          } else if (key === 40) {
              cancelAnimationFrame(move_down);
              move_down = false;
          }
      }
  });


  function left() {
      if (game_over === false && parseFloat(car.css('left')) > 0) {
          car.css('left', parseFloat(car.css('left')) - 7);
          move_left = requestAnimationFrame(left);
      }
  }

  function right() {
      if (game_over === false && parseFloat(car.css('left')) < container_width - car_width) {
          car.css('left', parseFloat(car.css('left')) + 7);
          move_right = requestAnimationFrame(right);
      }
  }

  function up() {
      if (game_over === false && parseFloat(car.css('top')) > 0) {
          car.css('top', parseFloat(car.css('top')) - 5);
          move_up = requestAnimationFrame(up);
      }
  }

  function down() {
      if (game_over === false && parseFloat(car.css('top')) < container_height - car_height) {
          car.css('top', parseFloat(car.css('top')) + 5);
          move_down = requestAnimationFrame(down);
      }
  }

        /* Move the cars and lines */
  anim_id = requestAnimationFrame(repeat);

  function repeat() {
      if (collision(car, cop_1) || collision(car, cop_2) || collision(car, cop_3)) {
          stop_the_game();
          return;
      }

      score_counter++;

      if (score_counter % 20 == 0) {
          score.text(parseFloat(score.text()) + 1);
      }
      if (score_counter % 200 == 0) {
          speed++;
          line_speed++;
      }

      cop_down(cop_1);
      cop_down(cop_2);
      cop_down(cop_3);

      line_down(line_1);
      line_down(line_2);
      line_down(line_3);

      anim_id = requestAnimationFrame(repeat);
  }

  function cop_down(car) {
      let car_current_top = parseFloat(car.css('top'));
      if (car_current_top > container_height) {
          car_current_top = -200;
          let car_left = parseFloat(Math.random() * (container_width - car_width));
          car.css('left', car_left);
      }
      car.css('top', car_current_top + speed);
  }

  function line_down(line) {
      let line_current_top = parseFloat(line.css('top'));
      if (line_current_top > container_height) {
          line_current_top = -300;
      }
      line.css('top', line_current_top + line_speed);
  }

  restart_btn.click(function() {
      location.reload();
  });

  function stop_the_game() {
      game_over = true;
      cancelAnimationFrame(anim_id);
      cancelAnimationFrame(move_right);
      cancelAnimationFrame(move_left);
      cancelAnimationFrame(move_up);
      cancelAnimationFrame(move_down);
      restart_div.slideDown();
      restart_btn.focus();
  }




  function collision($div1, $div2) {
      let x1 = $div1.offset().left;
      let y1 = $div1.offset().top;
      let h1 = $div1.outerHeight(true);
      let w1 = $div1.outerWidth(true);
      let b1 = y1 + h1;
      let r1 = x1 + w1;
      let x2 = $div2.offset().left;
      let y2 = $div2.offset().top;
      let h2 = $div2.outerHeight(true);
      let w2 = $div2.outerWidth(true);
      let b2 = y2 + h2;
      let r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }


});

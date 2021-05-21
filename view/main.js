module.exports = {
generateWebPage : function (current, total) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Vaakasovellus</title>
		<!-- CSS only -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
	</head>
	<body>
		<div class="container" style="border: 1px solid black; max-width: 800px;">
		<div class="row">
		<div class="col">
		<div class="row">
		<button class="btn btn-secondary">Punnitus</button>
		</div>
		</div>
		<div class="col">
		<div class="row">
		<button class="btn btn-secondary">Punnitushistoria</button>
		</div>
		</div>
		</div>
		<div class="text-center row my-5">
		<h1 class="display-1"><span id="currentWeight">${current}</span> kg</h1>
		<p class="h3">&sum;: <span id="currentTotal">${total}</span> kg</p>
		</div>

		<div class="row">
		<div class="col">
		<div class="row p-4">
		<button class="btn btn-lg btn-success text-center" onclick="weighButtonClicked()">Punnitse</button>
		</div>
		</div>
		<div class="col">
		<div class="row p-4">
		<button class="btn btn-lg btn-danger text-center" onclick="resetButtonClicked()">Nollaa</button>
		</div>
		</div>
		</div>
		</div>

		<!-- JavaScript Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script>
			// Handle weigh button click
			function weighButtonClicked() {
				$.getJSON('/weigh', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}

			// Handle reset button click
			function resetButtonClicked() {
				$.getJSON('/reset', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}
		</script>
		</body>
	</html>
	`;
}
};

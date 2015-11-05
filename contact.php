<div id="contact" class="panel" data-number="10">
    <a href="#portfolio" data-number="3" class="nav backto-panel cnt-back" id="backto">
        <img src="img/arrow-l.png"  alt="back-to-home">
    </a>
    <div class="contact">
        <section class="cf">
            <h1 class="panel-h1 contact-h1">Thank you for seeing my portfolio. <br> I'm looking forward to working with you.</h1>
            <form id="contact-form" method="post" action="mailer.php" class="contact-form">
                <label class="contact-label">Name</label>
				<input type="text" id="name" name="name"  class="contact-input"required>
                <label class="contact-label">Email</label>
				<input type="email" id="email" name="email" class="contact-input" required>
                <label class="contact-label">Message</label>
				<textarea id="message" name="message" class="contact-txtarea" required></textarea>
                  <div id="form-messages"></div>
				<button type="submit" class="submit">Send</button>
            </form>
        </section>
        <div id="sending">Sending...</div>
    </div>
</div> 
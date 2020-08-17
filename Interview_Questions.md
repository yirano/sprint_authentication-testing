### 1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

Sessions log the user's state on the server whereas JWT store it on the client side.

### 2. What does `bcrypt` do to help us store passwords in a secure manner.

Bcrypt encrypts our passwords using rounds of "salt" to hide the actual value of them. This helps the users in case the server/db gets hacked and all the hacker gets is a bunch of jumbled, random alphanumeric + symbol words.

### 3. How are unit tests different from integration and end-to-end testing.

Unit tests - tests the individual parts of our application
Integration - combines different modules in the application to test that it works as intended
End-to-end - tests for the user's flow of experience

### 4. How _Test Driven Development_ changes the way we write applications and tests.

It forces us to write our code with the expectation/outcome in mind.

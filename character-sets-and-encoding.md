# Character Sets and Encoding

So far, we have covered Path module and Events module.

Before we proceed, we need to take a detour.

In this detour we will be learning about:
- Character sets
- Encoding
- Streams and Buffers
- Asynchronous JavaScript

In this particular lesson the focus will primarily be 
Character Sets and Encoding.

---

## Binary Data

To understand what is a character set, let's first understand what is 
Binary Data. 

Computer store data in Binary format which is a collection of 0s and 1s.

Each 0 or 1 is called a binary digit or bit for short.

To work with a piece of data, a computer needs to convert that data 
into its binary representation. 

For example, to store the number four, the computer needs to convert 
the number 4 to 100.

But the question is, how does the computer know to perform the conversion?

Well, it is just simple mathematics where we rely on Base 2 numeric system.

100 can be represented as: 
`(2^2 * 1) + (2^1 * 0) + (2^0 * 0)`

This gives us `4 + 0 + 0 = 4`, pretty simple as you can see.

But you have to keep in mind that numbers are not the only data type that 
we work with. 

Strings are something we come across quite often. 

So how will a computer represent a character in binary format.

For example, the letter V, how does the computer convert the letter 
V to binary?

Well as it turns out, computers will first convert the character to a number, 
and then convert the number to its binary representation.

So for the character V the computer will convert the character to a number that 
represents V.

So if you you go to the Browser's console, and type in `"V".charCodeAt();`, 
you will see 86 as the result.

This is the numeric representation of the character V. It is also called character code.

Still though, how does the computer know what number will represent each character?

In our case, how does it know that V should be represented as 86?

Thus, this introduces our second topic in this lesson, Character Sets.

----- 

## Character Sets

Character Sets are predefined lists of characters represented by numbers.

We have different character sets we can use, but the two most popular ones 
are Unicode and ASCII. What you just saw on the Browser is Unicode. 

**Unicode character set dictates that 86 should represent character V.**

Now that we have characters as numbers, you may think that the computer 
can work with these numbers by converting them to Binary.

Well, that's partially true. 

Which brings us to our third topic, Character Encoding.

-----

## Character Encoding

Character Encoding distactes how to represent a number in a character set as binary 
data it can be stored in a computer.

More specifically, it dictates how many bits to use to represent the number.

Example of a character encoding system is UTF-8.

**UTF-8 states that characters should be encoded in bytes.**

Now a byte is a set of eight bits. So eight ones or zeros should be used to 
represent the code of any character in binary.

If you go back to our binary representation of the number 4, it was 
100. With UTF-8 encoding, the computer adds five zeros to the left to 
make it a byte. So 4 is actually represented as 00000100. 

On similar lines, V is represented as 86, which in turn is represented 
as 01010110. 1 byte, or 8 bits.

And this is how computers store strings or characters in binary format.

Now you should know that similar guidelines exist on how images and videos 
should be encoded and stored in binary format.

Well that is pretty much what we wanted to cover in this lesson.

-----

Hopefully, it is now clear as to what is Binary Data, what si a Character Set, 
and what is Character Encoding. 

With this knowledge, let's now learn about Streams and Buffers in the next
lesson.

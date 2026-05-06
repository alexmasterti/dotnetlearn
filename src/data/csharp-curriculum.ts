import type { Course, Chapter } from '../types';

const ch1Basics: Chapter = {
  id: 'ch1-basics',
  title: 'C# Basics',
  description: 'Your first lines of C# code',
  icon: '🌱',
  lessons: [
    {
      id: 'l1-hello-world',
      title: 'Welcome to C#',
      type: 'theory',
      xp: 10,
      theory: `# Welcome to C#!

C# (pronounced "see-sharp") is a modern, object-oriented language created by Microsoft. It's used to build everything from web apps and games (Unity) to mobile apps and cloud services.

## Your First Program

Here's a classic "Hello, World!" in C#:

\`\`\`csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

## What's going on?
- \`using System;\` - imports the System namespace (gives us \`Console\`)
- \`class Program\` - C# code lives inside **classes**
- \`static void Main()\` - the **entry point**: every C# program starts here
- \`Console.WriteLine(...)\` - prints text to the screen, then a newline

## Important
- C# is **case-sensitive**: \`Console\` is different from \`console\`
- Every statement ends with a **semicolon** (\`;\`)
- Curly braces \`{ }\` group code into **blocks**`,
    },
    {
      id: 'l2-hello-code',
      title: 'Write Your First Program',
      type: 'code',
      xp: 20,
      codeExercise: {
        instructions: 'Use `Console.WriteLine` to print **Hello, World!** to the screen.\n\nThe class structure is already there - you just need to add the print statement inside `Main()`.',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Print Hello, World! below

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
        tests: [
          { expectedOutput: 'Hello, World!', description: 'Should print "Hello, World!"' },
        ],
        hints: [
          'Use Console.WriteLine("...") with the text inside double quotes',
          'Don\'t forget the semicolon at the end',
        ],
      },
    },
    {
      id: 'l3-print-quiz',
      title: 'Console Output Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which method prints text **with** a newline at the end?',
          options: ['Console.Print()', 'Console.Write()', 'Console.WriteLine()', 'Console.Output()'],
          correctIndex: 2,
          explanation: 'Console.WriteLine() prints the text and adds a newline. Console.Write() prints without a newline.',
        },
        {
          question: 'What does every C# statement end with?',
          options: ['A period (.)', 'A semicolon (;)', 'A comma (,)', 'A newline'],
          correctIndex: 1,
          explanation: 'Every statement in C# ends with a semicolon. Forgetting it is one of the most common compile errors!',
        },
        {
          question: 'What is the **entry point** of a C# console application?',
          options: ['The Start() method', 'The first line of code', 'The Main() method', 'The Program class'],
          correctIndex: 2,
          explanation: 'The Main() method is where execution begins. It must be static and live inside a class.',
        },
        {
          question: 'Is C# case-sensitive?',
          options: ['Yes', 'No', 'Only for keywords', 'Only for class names'],
          correctIndex: 0,
          explanation: 'C# is fully case-sensitive. "Console" and "console" are different identifiers.',
        },
      ],
    },
    {
      id: 'l4-multiple-prints',
      title: 'Multiple Lines',
      type: 'code',
      xp: 20,
      codeExercise: {
        instructions: 'Print three lines:\n1. Your name\n2. Your favorite language\n3. The year\n\nExpected output:\n```\nAlex\nC#\n2026\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Three Console.WriteLine calls

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Alex");
        Console.WriteLine("C#");
        Console.WriteLine(2026);
    }
}`,
        tests: [{ expectedOutput: 'Alex\nC#\n2026', description: 'Should print three separate lines' }],
        hints: [
          'Use three separate Console.WriteLine calls',
          'Numbers don\'t need quotes; strings do',
        ],
      },
    },
  ],
};

const ch2Variables: Chapter = {
  id: 'ch2-variables',
  title: 'Variables & Data Types',
  description: 'Store and label your data',
  icon: '📦',
  lessons: [
    {
      id: 'l5-variables-theory',
      title: 'Variables in C#',
      type: 'theory',
      xp: 10,
      theory: `# Variables

A variable is a **named container** that holds a value. Unlike Python, C# is **statically typed** - you declare the type up front, and it doesn't change.

## Declaration Syntax

\`\`\`csharp
int age = 25;
string name = "Alice";
double price = 9.99;
bool isActive = true;
\`\`\`

## The \`var\` Keyword

C# can infer types using \`var\`:

\`\`\`csharp
var count = 10;        // inferred as int
var greeting = "Hi";   // inferred as string
\`\`\`

## Common Built-in Types

| Type | Holds | Example |
|------|-------|---------|
| \`int\` | Whole numbers | \`42\` |
| \`long\` | Big whole numbers | \`9999999999L\` |
| \`double\` | Decimal numbers | \`3.14\` |
| \`decimal\` | Precise decimals (money) | \`9.99m\` |
| \`bool\` | true/false | \`true\` |
| \`char\` | A single character | \`'A'\` |
| \`string\` | Text | \`"Hello"\` |

## Naming Rules
- Start with a **letter** or underscore
- Contains letters, digits, underscores
- Use **camelCase** for local variables: \`firstName\`
- Use **PascalCase** for public properties: \`FirstName\``,
    },
    {
      id: 'l6-variables-code',
      title: 'Declare Variables',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Declare three variables:\n- An `int` called `age` set to 28\n- A `string` called `name` set to `"Alice"`\n- A `double` called `height` set to 5.6\n\nThen print each on its own line.\n\nExpected output:\n```\nAlice\n28\n5.6\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare your variables

        // Print them in order: name, age, height

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        int age = 28;
        string name = "Alice";
        double height = 5.6;
        Console.WriteLine(name);
        Console.WriteLine(age);
        Console.WriteLine(height);
    }
}`,
        tests: [{ expectedOutput: 'Alice\n28\n5.6', description: 'Should print name, age, height' }],
        hints: [
          'Strings need double quotes: string name = "Alice";',
          'Print in this order: name, age, height',
        ],
      },
    },
    {
      id: 'l7-types-quiz',
      title: 'Data Types Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which type would you use for the value `3.14`?',
          options: ['int', 'string', 'double', 'bool'],
          correctIndex: 2,
          explanation: '`double` is C#\'s default floating-point type for decimal numbers like 3.14.',
        },
        {
          question: 'What is wrong with: `int x = "5";`',
          options: [
            'Nothing - it\'s valid',
            'Type mismatch - "5" is a string, not an int',
            'Missing semicolon',
            'x must be uppercase',
          ],
          correctIndex: 1,
          explanation: 'C# is statically typed. You can\'t assign a string to an int variable.',
        },
        {
          question: 'What does `var count = 10;` infer?',
          options: ['string', 'double', 'int', 'object'],
          correctIndex: 2,
          explanation: '`var` infers the type from the value. 10 is a whole number, so the inferred type is int.',
        },
        {
          question: 'Which type best represents money?',
          options: ['double', 'float', 'decimal', 'int'],
          correctIndex: 2,
          explanation: '`decimal` has higher precision than double/float, making it the right choice for currency.',
        },
      ],
    },
    {
      id: 'l8-string-interpolation',
      title: 'String Interpolation',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Use **string interpolation** (the `$"..."` syntax) to print the message:\n\n`My name is Alice and I am 28 years old.`\n\nPlace a `$` before the opening quote and put variables inside `{ }`.',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        string name = "Alice";
        int age = 28;
        // Print using $"..." with {name} and {age}

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        string name = "Alice";
        int age = 28;
        Console.WriteLine($"My name is {name} and I am {age} years old.");
    }
}`,
        tests: [
          {
            expectedOutput: 'My name is Alice and I am 28 years old.',
            description: 'Interpolated message',
          },
        ],
        hints: [
          'Format: $"text {variable} text"',
          'The `$` prefix tells the compiler this is an interpolated string',
        ],
      },
    },
  ],
};

const ch3Operators: Chapter = {
  id: 'ch3-operators',
  title: 'Operators & Expressions',
  description: 'Math, comparisons, and logic',
  icon: '➕',
  lessons: [
    {
      id: 'l9-math-theory',
      title: 'Math Operators',
      type: 'theory',
      xp: 10,
      theory: `# Math Operators

C# supports the standard math operators - but watch out for **integer division**!

| Op | Name | Example | Result |
|----|------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Subtraction | \`10 - 4\` | \`6\` |
| \`*\` | Multiply | \`3 * 4\` | \`12\` |
| \`/\` | Divide | \`15 / 4\` | \`3\` (int!) |
| \`%\` | Modulo | \`15 % 4\` | \`3\` |

## Integer vs Floating Division

\`\`\`csharp
int  a = 15 / 4;      // 3  (truncates!)
double b = 15.0 / 4;  // 3.75
double c = 15 / 4.0;  // 3.75
\`\`\`

If at least one operand is a floating type, the result is floating.

## Increment / Decrement

\`\`\`csharp
int x = 5;
x++;        // x is now 6
x--;        // x is now 5
x += 10;    // x is now 15
\`\`\`

## Order of Operations

C# follows standard precedence (PEMDAS):
1. Parentheses \`()\`
2. \`*\`, \`/\`, \`%\`
3. \`+\`, \`-\`

\`\`\`csharp
int r = 2 + 3 * 4;     // 14
int s = (2 + 3) * 4;   // 20
\`\`\``,
    },
    {
      id: 'l10-math-code',
      title: 'Calculator',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Calculate and print these on separate lines:\n1. The sum of 15 and 27\n2. The remainder of 100 divided by 7\n3. 2 to the power of 10 (use `Math.Pow(2, 10)` and cast to int)\n\nExpected output:\n```\n42\n2\n1024\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // 1. 15 + 27

        // 2. 100 % 7

        // 3. Math.Pow(2, 10) - cast to int with (int)

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(15 + 27);
        Console.WriteLine(100 % 7);
        Console.WriteLine((int)Math.Pow(2, 10));
    }
}`,
        tests: [
          { expectedOutput: '42\n2\n1024', description: 'Sum, modulo, and power' },
        ],
        hints: [
          'For #3: (int)Math.Pow(2, 10)',
          'Math.Pow returns double, so cast it back with (int)',
        ],
      },
    },
    {
      id: 'l11-comparison',
      title: 'Comparison & Logical Operators',
      type: 'theory',
      xp: 10,
      theory: `# Comparison Operators

| Op | Means | Example | Result |
|----|-------|---------|--------|
| \`==\` | equal | \`5 == 5\` | \`true\` |
| \`!=\` | not equal | \`5 != 3\` | \`true\` |
| \`>\` | greater | \`5 > 3\` | \`true\` |
| \`<\` | less | \`5 < 3\` | \`false\` |
| \`>=\` | gte | \`5 >= 5\` | \`true\` |
| \`<=\` | lte | \`3 <= 5\` | \`true\` |

These return a **\`bool\`** - either \`true\` or \`false\`.

## Logical Operators

| Op | Means | Example |
|----|-------|---------|
| \`&&\` | AND | \`a && b\` |
| \`\\|\\|\` | OR  | \`a \\|\\| b\` |
| \`!\` | NOT | \`!a\` |

## Short-circuit evaluation

\`&&\` stops as soon as it finds a \`false\`. \`||\` stops as soon as it finds a \`true\`. This is useful for safety:

\`\`\`csharp
if (user != null && user.IsActive) { ... }
\`\`\`

If \`user\` is null, the second part isn't evaluated - no NullReferenceException.`,
    },
    {
      id: 'l12-operators-quiz',
      title: 'Operators Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What is the value of `17 / 5` when both are int?',
          options: ['3.4', '3', '4', '17.5'],
          correctIndex: 1,
          explanation: 'Integer division truncates toward zero. 17 / 5 = 3 (the .4 is dropped).',
        },
        {
          question: 'What is `17 % 5`?',
          options: ['3', '2', '5', '17'],
          correctIndex: 1,
          explanation: 'Modulo gives the remainder. 17 = 3 × 5 + 2, so the remainder is 2.',
        },
        {
          question: 'Which logical operator means "AND"?',
          options: ['&', '&&', '||', 'and'],
          correctIndex: 1,
          explanation: '`&&` is the logical AND operator. The single `&` is bitwise AND.',
        },
        {
          question: 'What does `!(5 > 3)` evaluate to?',
          options: ['true', 'false', 'Compile error', '5'],
          correctIndex: 1,
          explanation: '5 > 3 is true. The ! operator negates it, giving false.',
        },
      ],
    },
  ],
};

const ch4Conditionals: Chapter = {
  id: 'ch4-conditionals',
  title: 'Conditionals',
  description: 'Make decisions in your code',
  icon: '🔀',
  lessons: [
    {
      id: 'l13-if-theory',
      title: 'If / Else',
      type: 'theory',
      xp: 10,
      theory: `# If Statements

C# uses curly braces (no colons or indentation magic):

\`\`\`csharp
if (age >= 18)
{
    Console.WriteLine("You can vote!");
}
\`\`\`

## If / Else

\`\`\`csharp
int temp = 30;
if (temp > 25)
{
    Console.WriteLine("It's hot!");
}
else
{
    Console.WriteLine("It's cool.");
}
\`\`\`

## Else If

\`\`\`csharp
int score = 85;
if (score >= 90)        Console.WriteLine("A");
else if (score >= 80)   Console.WriteLine("B");
else if (score >= 70)   Console.WriteLine("C");
else                    Console.WriteLine("F");
\`\`\`

## Single-line if

When a block has just one statement, you can drop the braces - but most teams require them for clarity.

## Ternary Operator

A compact one-liner for if/else:

\`\`\`csharp
string grade = score >= 60 ? "Pass" : "Fail";
\`\`\``,
    },
    {
      id: 'l14-grade-code',
      title: 'Grade Calculator',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Given the variable `score = 85`, print the letter grade:\n- 90+ → `A`\n- 80-89 → `B`\n- 70-79 → `C`\n- below 70 → `F`',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int score = 85;
        // Print the grade

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        int score = 85;
        if (score >= 90) Console.WriteLine("A");
        else if (score >= 80) Console.WriteLine("B");
        else if (score >= 70) Console.WriteLine("C");
        else Console.WriteLine("F");
    }
}`,
        tests: [{ expectedOutput: 'B', description: 'Score 85 → B' }],
        hints: [
          'Use if / else if / else, not multiple separate ifs',
          'Order matters: check the highest grade first',
        ],
      },
    },
    {
      id: 'l15-switch-theory',
      title: 'Switch Statements',
      type: 'theory',
      xp: 10,
      theory: `# Switch

When you have many discrete values, \`switch\` is cleaner than chained \`if\`s.

\`\`\`csharp
string day = "Mon";
switch (day)
{
    case "Mon":
    case "Tue":
    case "Wed":
    case "Thu":
    case "Fri":
        Console.WriteLine("Weekday");
        break;
    case "Sat":
    case "Sun":
        Console.WriteLine("Weekend");
        break;
    default:
        Console.WriteLine("Unknown");
        break;
}
\`\`\`

Each branch needs a \`break\` (or \`return\`) - C# does **not** allow fall-through (unlike C/Java) except for empty cases.

## Switch Expression (modern, C# 8+)

\`\`\`csharp
string label = day switch
{
    "Sat" or "Sun" => "Weekend",
    "Mon" or "Tue" or "Wed" or "Thu" or "Fri" => "Weekday",
    _ => "Unknown"
};
\`\`\`

The \`_\` is the **discard pattern**, like \`default\`.`,
    },
    {
      id: 'l16-even-odd',
      title: 'Even or Odd',
      type: 'challenge',
      xp: 35,
      challenge: {
        description: 'Given an integer `n`, return `"Even"` if it is even and `"Odd"` if it is odd.\n\nUse the modulo operator: a number is even when `n % 2 == 0`.',
        difficulty: 'easy',
        examples: [
          { input: '4', output: 'Even' },
          { input: '7', output: 'Odd' },
          { input: '0', output: 'Even', explanation: 'Zero is even.' },
        ],
        functionName: 'EvenOrOdd',
        starterCode: `using System;

public class Solution
{
    public string EvenOrOdd(int n)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;

public class Solution
{
    public string EvenOrOdd(int n)
    {
        return n % 2 == 0 ? "Even" : "Odd";
    }
}`,
        testCases: [
          { input: '4', expected: 'Even', description: 'n = 4' },
          { input: '7', expected: 'Odd', description: 'n = 7' },
          { input: '0', expected: 'Even', description: 'n = 0' },
          { input: '-3', expected: 'Odd', description: 'n = -3 (negative)' },
          { input: '1000', expected: 'Even', description: 'n = 1000' },
        ],
        hints: [
          'The modulo operator `%` returns the remainder of division',
          'A number is even if dividing by 2 leaves no remainder',
          'You can use the ternary `cond ? a : b` for a one-liner',
        ],
      },
    },
  ],
};

const ch5Loops: Chapter = {
  id: 'ch5-loops',
  title: 'Loops',
  description: 'Repeat code efficiently',
  icon: '🔁',
  lessons: [
    {
      id: 'l17-for-theory',
      title: 'For Loops',
      type: 'theory',
      xp: 10,
      theory: `# For Loops

A C# \`for\` loop has three parts: **init**, **condition**, **update**.

\`\`\`csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
// 0, 1, 2, 3, 4
\`\`\`

Read it as: "start \`i\` at 0; while \`i < 5\`, run the body; after each pass, do \`i++\`."

## Counting backwards

\`\`\`csharp
for (int i = 10; i > 0; i--)
{
    Console.WriteLine(i);
}
\`\`\`

## Stepping by 2

\`\`\`csharp
for (int i = 0; i < 20; i += 2)
{
    Console.WriteLine(i);
}
\`\`\`

## foreach

When you have a collection, prefer \`foreach\`:

\`\`\`csharp
string[] fruits = { "apple", "banana", "cherry" };
foreach (var fruit in fruits)
{
    Console.WriteLine(fruit);
}
\`\`\``,
    },
    {
      id: 'l18-for-code',
      title: 'Print 1 through 5',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Use a `for` loop to print the numbers **1 through 5**, each on its own line.',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // for loop printing 1..5

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine(i);
        }
    }
}`,
        tests: [{ expectedOutput: '1\n2\n3\n4\n5', description: 'Numbers 1 through 5' }],
        hints: [
          'Start at 1, end at i <= 5 (inclusive)',
          'i++ increments by 1 each iteration',
        ],
      },
    },
    {
      id: 'l19-while-theory',
      title: 'While & Do-While',
      type: 'theory',
      xp: 10,
      theory: `# While Loops

\`while\` repeats while a condition is **true**. Check happens **before** each pass:

\`\`\`csharp
int count = 0;
while (count < 5)
{
    Console.WriteLine(count);
    count++;
}
\`\`\`

## Do-While

Runs the body **at least once**, then checks the condition:

\`\`\`csharp
int n;
do
{
    n = ReadInput();
} while (n < 0);
\`\`\`

## break & continue

\`\`\`csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5) break;       // exit the loop
    if (i % 2 == 0) continue; // skip to next iteration
    Console.WriteLine(i);
}
// prints 1, 3
\`\`\`

## Beware infinite loops!

\`\`\`csharp
// BAD - never exits
while (true) { Console.WriteLine("oops"); }
\`\`\`

Always have an exit condition.`,
    },
    {
      id: 'l20-sum-challenge',
      title: 'Sum 1 to N',
      type: 'challenge',
      xp: 35,
      challenge: {
        description: 'Return the sum of all integers from 1 to n (inclusive).\n\nIf n is 0 or negative, return 0.',
        difficulty: 'easy',
        examples: [
          { input: '5', output: '15', explanation: '1+2+3+4+5 = 15' },
          { input: '10', output: '55' },
          { input: '0', output: '0' },
        ],
        functionName: 'SumToN',
        starterCode: `using System;

public class Solution
{
    public int SumToN(int n)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int SumToN(int n)
    {
        int total = 0;
        for (int i = 1; i <= n; i++) total += i;
        return total;
    }
}`,
        testCases: [
          { input: '5', expected: '15', description: 'n = 5 → 15' },
          { input: '10', expected: '55', description: 'n = 10 → 55' },
          { input: '1', expected: '1', description: 'n = 1 → 1' },
          { input: '0', expected: '0', description: 'n = 0 → 0' },
          { input: '-3', expected: '0', description: 'n = -3 (negative) → 0' },
          { input: '100', expected: '5050', description: 'n = 100 → 5050' },
        ],
        hints: [
          'Initialize a running total to 0',
          'Loop from 1 up to and including n',
          'There\'s also a closed-form formula: n*(n+1)/2',
        ],
      },
    },
  ],
};

const ch6Methods: Chapter = {
  id: 'ch6-methods',
  title: 'Methods',
  description: 'Reusable blocks of code',
  icon: '🛠️',
  lessons: [
    {
      id: 'l21-methods-theory',
      title: 'Defining Methods',
      type: 'theory',
      xp: 10,
      theory: `# Methods

A method is a reusable named block of code. C# methods always live inside a class.

\`\`\`csharp
static int Add(int a, int b)
{
    return a + b;
}
\`\`\`

Breaking it down:
- \`static\` - belongs to the class itself, not an instance (we'll cover instances later)
- \`int\` - the **return type**
- \`Add\` - the method **name** (PascalCase by convention)
- \`(int a, int b)\` - the **parameters**
- \`return a + b;\` - sends a value back to the caller

## void: no return value

When a method doesn't return anything:

\`\`\`csharp
static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}
\`\`\`

## Calling

\`\`\`csharp
int sum = Add(3, 4);     // sum is 7
Greet("Alice");          // prints "Hello, Alice!"
\`\`\`

## Default values

Parameters can have defaults:

\`\`\`csharp
static int Power(int b, int exp = 2)
{
    int r = 1;
    for (int i = 0; i < exp; i++) r *= b;
    return r;
}
Power(5);     // 25 (uses default exp = 2)
Power(2, 10); // 1024
\`\`\``,
    },
    {
      id: 'l22-method-code',
      title: 'Write a Multiply Method',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Add a static method called `Multiply` that takes two `int`s and returns their product.\n\n`Main()` already calls `Multiply(6, 7)` and prints the result. You only need to define the method.\n\nExpected output:\n```\n42\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(Multiply(6, 7));
    }

    // Define Multiply below

}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine(Multiply(6, 7));
    }

    static int Multiply(int a, int b)
    {
        return a * b;
    }
}`,
        tests: [{ expectedOutput: '42', description: '6 × 7 = 42' }],
        hints: [
          'Use the static keyword (Main is static and can only call other static methods directly)',
          'Return type is int',
        ],
      },
    },
    {
      id: 'l23-overloading',
      title: 'Method Overloading',
      type: 'theory',
      xp: 10,
      theory: `# Overloading

C# lets you define **multiple methods with the same name** as long as their parameters differ:

\`\`\`csharp
static int Sum(int a, int b)         => a + b;
static double Sum(double a, double b) => a + b;
static int Sum(int a, int b, int c)   => a + b + c;
\`\`\`

The compiler picks the right one based on the arguments you pass:

\`\`\`csharp
Sum(1, 2);          // calls (int, int)
Sum(1.5, 2.5);      // calls (double, double)
Sum(1, 2, 3);       // calls (int, int, int)
\`\`\`

## Expression-bodied syntax

The fat arrow \`=>\` is shorthand for a method that has just one return statement:

\`\`\`csharp
static int Square(int n) => n * n;
\`\`\`

is equivalent to:

\`\`\`csharp
static int Square(int n) { return n * n; }
\`\`\``,
    },
    {
      id: 'l24-fizzbuzz',
      title: 'FizzBuzz Challenge',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Classic FizzBuzz! Given a positive integer `n`, return:\n- `"FizzBuzz"` if `n` is divisible by **both** 3 and 5\n- `"Fizz"` if divisible by 3 only\n- `"Buzz"` if divisible by 5 only\n- The number as a string otherwise',
        difficulty: 'easy',
        examples: [
          { input: '3', output: 'Fizz' },
          { input: '5', output: 'Buzz' },
          { input: '15', output: 'FizzBuzz' },
          { input: '7', output: '7' },
        ],
        functionName: 'FizzBuzz',
        starterCode: `using System;

public class Solution
{
    public string FizzBuzz(int n)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;

public class Solution
{
    public string FizzBuzz(int n)
    {
        if (n % 15 == 0) return "FizzBuzz";
        if (n % 3 == 0) return "Fizz";
        if (n % 5 == 0) return "Buzz";
        return n.ToString();
    }
}`,
        testCases: [
          { input: '3', expected: 'Fizz', description: '3 → Fizz' },
          { input: '5', expected: 'Buzz', description: '5 → Buzz' },
          { input: '15', expected: 'FizzBuzz', description: '15 → FizzBuzz' },
          { input: '7', expected: '7', description: '7 → "7"' },
          { input: '30', expected: 'FizzBuzz', description: '30 → FizzBuzz' },
          { input: '9', expected: 'Fizz', description: '9 → Fizz' },
          { input: '25', expected: 'Buzz', description: '25 → Buzz' },
        ],
        hints: [
          'Check divisible-by-15 first, otherwise FizzBuzz cases get caught by Fizz or Buzz',
          'Use the `%` operator: n % 3 == 0 means n is divisible by 3',
          'Convert int to string with `n.ToString()`',
        ],
      },
    },
  ],
};

const ch7Collections: Chapter = {
  id: 'ch7-collections',
  title: 'Arrays & Lists',
  description: 'Group values together',
  icon: '📚',
  lessons: [
    {
      id: 'l25-arrays-theory',
      title: 'Arrays',
      type: 'theory',
      xp: 10,
      theory: `# Arrays

An **array** is a fixed-size sequence of values - all the same type.

\`\`\`csharp
int[] numbers = { 10, 20, 30, 40, 50 };
string[] names = new string[3]; // size 3, all null

numbers[0] = 99;          // assign by index (zero-based)
int first = numbers[0];   // read by index
int len = numbers.Length; // length
\`\`\`

## Iterating

\`\`\`csharp
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine(numbers[i]);
}

foreach (var n in numbers) Console.WriteLine(n);
\`\`\`

## Important
- Arrays are **fixed size** once created
- Indexing is **zero-based** - first element is index 0
- Out-of-range access throws \`IndexOutOfRangeException\``,
    },
    {
      id: 'l26-arrays-code',
      title: 'Sum an Array',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Given the array `int[] nums = { 5, 10, 15, 20, 25 };` print the **sum** of all elements.\n\nExpected output:\n```\n75\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        int[] nums = { 5, 10, 15, 20, 25 };
        // Print the sum

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        int[] nums = { 5, 10, 15, 20, 25 };
        int sum = 0;
        foreach (var n in nums) sum += n;
        Console.WriteLine(sum);
    }
}`,
        tests: [{ expectedOutput: '75', description: 'Sum is 75' }],
        hints: [
          'Initialize an int total = 0',
          'foreach over nums and add each value to total',
        ],
      },
    },
    {
      id: 'l27-lists-theory',
      title: 'List<T>',
      type: 'theory',
      xp: 10,
      theory: `# List<T>

When you need a **resizable** collection, use \`List<T>\` from \`System.Collections.Generic\`.

\`\`\`csharp
using System.Collections.Generic;

var fruits = new List<string>();
fruits.Add("apple");
fruits.Add("banana");
fruits.Add("cherry");

Console.WriteLine(fruits.Count);     // 3
Console.WriteLine(fruits[0]);        // "apple"

fruits.Remove("banana");
fruits.Insert(0, "kiwi");
bool has = fruits.Contains("apple"); // true
\`\`\`

## With initializer

\`\`\`csharp
var ints = new List<int> { 1, 2, 3, 4, 5 };
\`\`\`

## Iteration

\`\`\`csharp
foreach (var f in fruits) Console.WriteLine(f);
\`\`\`

## Array vs List

| Use array when... | Use List<T> when... |
|---|---|
| Size is known and won't change | You need to add/remove items |
| You need maximum performance | You want richer methods (Sort, Find, etc.) |
| Working with arrays from APIs | You're prototyping or building a collection |`,
    },
    {
      id: 'l28-max-challenge',
      title: 'Find the Maximum',
      type: 'challenge',
      xp: 40,
      challenge: {
        description: 'Given an array of integers, return the **largest** value.\n\nThe array always has at least one element.',
        difficulty: 'easy',
        examples: [
          { input: '[3, 7, 2, 8, 5]', output: '8' },
          { input: '[-1, -5, -2]', output: '-1', explanation: 'All negative - the max is the closest to zero.' },
          { input: '[42]', output: '42' },
        ],
        functionName: 'FindMax',
        starterCode: `using System;

public class Solution
{
    public int FindMax(int[] nums)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int FindMax(int[] nums)
    {
        int max = nums[0];
        for (int i = 1; i < nums.Length; i++)
            if (nums[i] > max) max = nums[i];
        return max;
    }
}`,
        testCases: [
          { input: '[3, 7, 2, 8, 5]', expected: '8', description: 'Mixed positives' },
          { input: '[-1, -5, -2]', expected: '-1', description: 'All negative' },
          { input: '[42]', expected: '42', description: 'Single element' },
          { input: '[1, 2, 3, 4, 5]', expected: '5', description: 'Already sorted' },
          { input: '[100, 50, 25, 12, 6]', expected: '100', description: 'Descending' },
        ],
        hints: [
          'Initialize max with the first element, not 0 (the array could be all negative)',
          'Loop from index 1 onward and update max when you find a larger element',
        ],
      },
    },
  ],
};

const ch8Strings: Chapter = {
  id: 'ch8-strings',
  title: 'Strings',
  description: 'Text manipulation in C#',
  icon: '🔤',
  lessons: [
    {
      id: 'l29-strings-theory',
      title: 'String Methods',
      type: 'theory',
      xp: 10,
      theory: `# Strings

In C#, \`string\` is **immutable** - methods return new strings rather than modifying the original.

## Common members

\`\`\`csharp
string s = "Hello, World!";

s.Length;                // 13
s.ToUpper();             // "HELLO, WORLD!"
s.ToLower();             // "hello, world!"
s.Contains("World");     // true
s.StartsWith("Hello");   // true
s.EndsWith("!");         // true
s.IndexOf("World");      // 7
s.Replace("World", "C#");// "Hello, C#!"
s.Substring(7, 5);       // "World"
s.Trim();                // removes leading/trailing whitespace
s.Split(',');            // string[] { "Hello", " World!" }
\`\`\`

## Concatenation

\`\`\`csharp
string a = "Hello";
string b = "World";
string c = a + ", " + b + "!";          // "Hello, World!"
string d = $"{a}, {b}!";                 // interpolation
string e = string.Concat(a, ", ", b);
string f = string.Join(" ", a, b);       // "Hello World"
\`\`\`

## Character access

\`\`\`csharp
string s = "Hello";
char first = s[0];   // 'H'
\`\`\``,
    },
    {
      id: 'l30-reverse-challenge',
      title: 'Reverse a String',
      type: 'challenge',
      xp: 40,
      challenge: {
        description: 'Return the input string reversed.\n\nFor example, "hello" → "olleh".',
        difficulty: 'easy',
        examples: [
          { input: '"hello"', output: 'olleh' },
          { input: '"a"', output: 'a' },
          { input: '""', output: '', explanation: 'Empty string reversed is empty.' },
        ],
        functionName: 'Reverse',
        starterCode: `using System;

public class Solution
{
    public string Reverse(string s)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;

public class Solution
{
    public string Reverse(string s)
    {
        var arr = s.ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }
}`,
        testCases: [
          { input: '"hello"', expected: 'olleh', description: 'hello → olleh' },
          { input: '"a"', expected: 'a', description: 'Single char' },
          { input: '""', expected: '', description: 'Empty string' },
          { input: '"C# rocks"', expected: 'skcor #C', description: 'Multi-word' },
          { input: '"racecar"', expected: 'racecar', description: 'Palindrome' },
        ],
        hints: [
          'Convert the string to a char array with `s.ToCharArray()`',
          'Use `Array.Reverse(arr)` to reverse in-place',
          'Build a new string from the array with `new string(arr)`',
        ],
      },
    },
    {
      id: 'l31-strings-quiz',
      title: 'Strings Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Strings in C# are...',
          options: ['Mutable', 'Immutable', 'Mutable inside a class', 'Mutable only in `unsafe` blocks'],
          correctIndex: 1,
          explanation: 'C# strings are immutable. Methods like Replace and ToUpper return a new string; they don\'t modify the original.',
        },
        {
          question: 'What does `"hello".Substring(1, 3)` return?',
          options: ['"hel"', '"ell"', '"llo"', '"hello"'],
          correctIndex: 1,
          explanation: 'Substring(start, length) - starts at index 1 and takes 3 chars: "ell".',
        },
        {
          question: 'How do you check if a string contains another?',
          options: ['s.Has(other)', 's.Includes(other)', 's.Contains(other)', 's.In(other)'],
          correctIndex: 2,
          explanation: 'string.Contains is the standard method.',
        },
      ],
    },
  ],
};

const ch9OopBasics: Chapter = {
  id: 'ch9-oop-basics',
  title: 'Classes & Objects',
  description: 'Build your own types',
  icon: '🧱',
  lessons: [
    {
      id: 'l32-class-theory',
      title: 'Classes',
      type: 'theory',
      xp: 15,
      theory: `# Classes

A **class** is a blueprint for an object - it describes what the object knows (fields/properties) and what it can do (methods).

\`\`\`csharp
class Person
{
    // Properties
    public string Name { get; set; }
    public int Age { get; set; }

    // Method
    public void Greet()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age}.");
    }
}
\`\`\`

## Creating instances

\`\`\`csharp
var alice = new Person();
alice.Name = "Alice";
alice.Age = 30;
alice.Greet();
\`\`\`

## Object initializer (concise)

\`\`\`csharp
var bob = new Person { Name = "Bob", Age = 25 };
bob.Greet();
\`\`\`

## Properties vs Fields

| Field (lowercase, private) | Property (PascalCase, public) |
|---------------------------|-------------------------------|
| \`private int age;\` | \`public int Age { get; set; }\` |
| Direct storage | Hidden methods (get/set) |
| Use for internal state | Use for public access |

Auto-properties (\`{ get; set; }\`) generate the storage for you.`,
    },
    {
      id: 'l33-constructor-theory',
      title: 'Constructors',
      type: 'theory',
      xp: 15,
      theory: `# Constructors

A **constructor** runs when you create a new instance with \`new\`. It typically initializes the object's data.

\`\`\`csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    // Constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

var p = new Person("Alice", 30);
\`\`\`

## Default constructor

If you don't write one, C# generates a parameterless constructor for you - **but only if you write none yourself**. Once you add any constructor, the default goes away.

## Multiple constructors (overloading)

\`\`\`csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person() { Name = "Unknown"; Age = 0; }
    public Person(string name) : this(name, 0) { }
    public Person(string name, int age) { Name = name; Age = age; }
}
\`\`\`

The \`: this(...)\` syntax calls another constructor of the same class.`,
    },
    {
      id: 'l34-class-code',
      title: 'Build a Rectangle Class',
      type: 'code',
      xp: 40,
      codeExercise: {
        instructions: 'Define a `Rectangle` class with:\n- `Width` and `Height` properties (both `int`)\n- A constructor that takes width and height\n- A method `Area()` that returns Width × Height\n\n`Main()` already creates a 5×3 rectangle and prints its area. Expected output:\n```\n15\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        var r = new Rectangle(5, 3);
        Console.WriteLine(r.Area());
    }
}

// Define Rectangle below
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        var r = new Rectangle(5, 3);
        Console.WriteLine(r.Area());
    }
}

class Rectangle
{
    public int Width { get; set; }
    public int Height { get; set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public int Area() => Width * Height;
}`,
        tests: [{ expectedOutput: '15', description: '5 × 3 = 15' }],
        hints: [
          'Use auto-properties: public int Width { get; set; }',
          'Constructor body: assign the parameters to the properties',
          'Area() can use expression body: => Width * Height;',
        ],
      },
    },
    {
      id: 'l35-static-theory',
      title: 'Static vs Instance',
      type: 'theory',
      xp: 10,
      theory: `# Static vs Instance

**Instance members** belong to a specific object. **Static members** belong to the class itself.

\`\`\`csharp
class MathHelper
{
    public static double Pi = 3.14159;

    public static int Square(int n) => n * n;
}

// Call without creating an instance:
double pi = MathHelper.Pi;
int s = MathHelper.Square(7);
\`\`\`

## When to use static
- Utility functions that don't depend on object state (\`Math.Sqrt\`, \`Math.Pow\`)
- Constants that belong to the class
- Counters or shared resources

## When to use instance
- Data that varies per object (a Person's name)
- Methods that read/modify that data

## A common pitfall

You **cannot** call an instance method directly from a static method - you need an instance:

\`\`\`csharp
class App
{
    public void Greet() => Console.WriteLine("hi");

    public static void Main()
    {
        // Greet();          // ERROR
        new App().Greet();   // OK
    }
}
\`\`\``,
    },
  ],
};

const ch10Inheritance: Chapter = {
  id: 'ch10-inheritance',
  title: 'Inheritance & Polymorphism',
  description: 'Build hierarchies of types',
  icon: '🌳',
  lessons: [
    {
      id: 'l36-inheritance-theory',
      title: 'Inheritance',
      type: 'theory',
      xp: 15,
      theory: `# Inheritance

**Inheritance** lets a class reuse the members of another class. The base type defines what's common; the derived type adds or overrides.

\`\`\`csharp
class Animal
{
    public string Name { get; set; }
    public void Eat() => Console.WriteLine($"{Name} is eating");
}

class Dog : Animal   // Dog inherits Animal
{
    public void Bark() => Console.WriteLine($"{Name} says woof!");
}

var d = new Dog { Name = "Rex" };
d.Eat();   // inherited
d.Bark();  // own
\`\`\`

## C# is single-inheritance

A class can only inherit from **one** base class (but can implement many interfaces - covered later).

## base keyword

Use \`base\` to call into the parent class:

\`\`\`csharp
class Dog : Animal
{
    public Dog(string name)
    {
        Name = name;
        base.Eat(); // explicit
    }
}
\`\`\`

## sealed

Mark a class as \`sealed\` to forbid further inheritance:

\`\`\`csharp
sealed class FinalClass { }
\`\`\``,
    },
    {
      id: 'l37-polymorphism-theory',
      title: 'Virtual & Override',
      type: 'theory',
      xp: 15,
      theory: `# Polymorphism

**Polymorphism** ("many forms") lets derived classes provide their own implementation of a base method.

## virtual + override

\`\`\`csharp
class Animal
{
    public virtual string Speak() => "generic sound";
}

class Dog : Animal
{
    public override string Speak() => "Woof!";
}

class Cat : Animal
{
    public override string Speak() => "Meow!";
}

Animal[] zoo = { new Dog(), new Cat(), new Animal() };
foreach (var a in zoo)
    Console.WriteLine(a.Speak());
// Woof!
// Meow!
// generic sound
\`\`\`

The runtime picks the right \`Speak\` based on the **actual type**, not the variable type.

## abstract classes

Abstract classes cannot be instantiated and can declare methods without bodies, forcing derived classes to implement them:

\`\`\`csharp
abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}
\`\`\``,
    },
    {
      id: 'l38-shape-code',
      title: 'Shape Hierarchy',
      type: 'code',
      xp: 50,
      codeExercise: {
        instructions: 'Create an `abstract` class `Shape` with an abstract method `Area()`. Then create `Circle` (with `Radius`) and `Square` (with `Side`) that override `Area()`.\n\n`Main()` is already filled in. It creates a Circle of radius 5 and a Square of side 4, then prints their areas.\n\nExpected output (the second number must be exactly **16**):\n```\n78.53981633974483\n16\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        Shape c = new Circle { Radius = 5 };
        Shape s = new Square { Side = 4 };
        Console.WriteLine(c.Area());
        Console.WriteLine(s.Area());
    }
}

// Define Shape, Circle, Square below
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Shape c = new Circle { Radius = 5 };
        Shape s = new Square { Side = 4 };
        Console.WriteLine(c.Area());
        Console.WriteLine(s.Area());
    }
}

abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}

class Square : Shape
{
    public int Side { get; set; }
    public override double Area() => Side * Side;
}`,
        tests: [
          { expectedOutput: '78.53981633974483\n16', description: 'Circle and Square areas' },
        ],
        hints: [
          'Shape: `abstract class Shape { public abstract double Area(); }`',
          'Circle uses `Math.PI * Radius * Radius`',
          'Square uses `Side * Side`. Return type is double for the override - but for an int * int, the value 16 prints without decimals.',
        ],
      },
    },
    {
      id: 'l39-interface-theory',
      title: 'Interfaces',
      type: 'theory',
      xp: 15,
      theory: `# Interfaces

An **interface** is a contract: it lists members that any implementer must provide. Unlike inheritance, a class can implement **many** interfaces.

\`\`\`csharp
interface IDrawable
{
    void Draw();
}

interface IResizable
{
    void Resize(double factor);
}

class Button : IDrawable, IResizable
{
    public void Draw() => Console.WriteLine("Drawing button");
    public void Resize(double factor) => Console.WriteLine($"Resized x{factor}");
}
\`\`\`

## Conventions
- Interface names start with \`I\` (\`IDisposable\`, \`IComparable\`, \`IEnumerable\`)
- Members are public by default, no body
- A class can extend one base class **and** implement many interfaces

## Why interfaces?
- **Decoupling**: code depends on the contract, not the implementation
- **Multiple implementers**: many classes can satisfy the same interface
- **Testability**: you can swap real services for fake ones in tests`,
    },
  ],
};

const ch11Linq: Chapter = {
  id: 'ch11-linq',
  title: 'LINQ',
  description: 'Query collections like SQL',
  icon: '🔍',
  lessons: [
    {
      id: 'l40-linq-theory',
      title: 'Intro to LINQ',
      type: 'theory',
      xp: 15,
      theory: `# LINQ

**LINQ** (Language Integrated Query) lets you filter, transform, and aggregate collections in a fluent way. It works on arrays, lists, dictionaries, even databases.

\`\`\`csharp
using System.Linq;

int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = nums.Where(n => n % 2 == 0);          // 2, 4, 6, 8, 10
var doubled = nums.Select(n => n * 2);             // 2, 4, 6, ... 20
int total = nums.Sum();                            // 55
int max = nums.Max();                              // 10
double avg = nums.Average();                       // 5.5
int count = nums.Count(n => n > 5);                // 5

bool anyBig = nums.Any(n => n > 100);              // false
bool allPos = nums.All(n => n > 0);                // true

var first3 = nums.Take(3);                          // 1, 2, 3
var skip3 = nums.Skip(3);                           // 4, 5, ... 10
var sorted = nums.OrderByDescending(n => n);        // 10, 9, ... 1
\`\`\`

## Lambda Expressions

\`n => n * 2\` is a **lambda** - a tiny inline function. Read it as: "given \`n\`, return \`n * 2\`."

For multi-statement bodies use braces:

\`\`\`csharp
nums.Select(n =>
{
    int doubled = n * 2;
    return doubled + 1;
});
\`\`\`

## Materializing

LINQ is **lazy** - it doesn't run until you iterate. To force execution, call \`.ToArray()\`, \`.ToList()\`, \`.Count()\`, etc.`,
    },
    {
      id: 'l41-linq-code',
      title: 'Sum of Even Squares',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Use LINQ on the array `{ 1, 2, 3, 4, 5, 6, 7, 8 }` to compute and print the **sum of squares of the even numbers**.\n\n2² + 4² + 6² + 8² = 4 + 16 + 36 + 64 = **120**',
        starterCode: `using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8 };
        // Filter evens, square them, sum
        int result = 0;
        Console.WriteLine(result);
    }
}
`,
        solution: `using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8 };
        int result = nums.Where(n => n % 2 == 0).Select(n => n * n).Sum();
        Console.WriteLine(result);
    }
}`,
        tests: [{ expectedOutput: '120', description: 'Sum of squares of evens' }],
        hints: [
          'Chain Where(n => n % 2 == 0).Select(n => n * n).Sum()',
          'You can replace Select(n => n * n) with Sum(n => n * n) for one less step',
        ],
      },
    },
    {
      id: 'l42-distinct-challenge',
      title: 'Count Distinct Words',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Given a string of space-separated words, return the count of **distinct** words (case-sensitive).\n\nReturn 0 for an empty string.',
        difficulty: 'medium',
        examples: [
          { input: '"the the quick brown fox"', output: '4', explanation: 'Distinct: the, quick, brown, fox.' },
          { input: '"hello hello hello"', output: '1' },
          { input: '""', output: '0' },
        ],
        functionName: 'CountDistinct',
        starterCode: `using System;
using System.Linq;

public class Solution
{
    public int CountDistinct(string s)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;
using System.Linq;

public class Solution
{
    public int CountDistinct(string s)
    {
        if (string.IsNullOrWhiteSpace(s)) return 0;
        return s.Split(' ', StringSplitOptions.RemoveEmptyEntries).Distinct().Count();
    }
}`,
        testCases: [
          { input: '"the the quick brown fox"', expected: '4', description: 'Mixed duplicates' },
          { input: '"hello hello hello"', expected: '1', description: 'All duplicates' },
          { input: '""', expected: '0', description: 'Empty' },
          { input: '"a b c d e"', expected: '5', description: 'All distinct' },
          { input: '"one"', expected: '1', description: 'Single word' },
        ],
        hints: [
          'Use `s.Split(\' \')` to break into words',
          'Add `StringSplitOptions.RemoveEmptyEntries` to skip empty entries from extra spaces',
          'Chain `.Distinct().Count()` for the final result',
        ],
      },
    },
    {
      id: 'l43-linq-quiz',
      title: 'LINQ Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which LINQ method **filters** a sequence?',
          options: ['Select', 'Where', 'Filter', 'Aggregate'],
          correctIndex: 1,
          explanation: 'Where takes a predicate (returns bool) and keeps the matching elements. Select transforms; Filter is not a LINQ method.',
        },
        {
          question: 'Which LINQ method **transforms** each element?',
          options: ['Where', 'Map', 'Select', 'Convert'],
          correctIndex: 2,
          explanation: 'Select is C#\'s "map" - it projects each item through a function. Where is filter.',
        },
        {
          question: 'What does `nums.All(n => n > 0)` do?',
          options: [
            'Returns the first positive element',
            'Returns true if every element is > 0',
            'Filters positives',
            'Throws if any element is negative',
          ],
          correctIndex: 1,
          explanation: 'All returns true only when the predicate holds for every element. Empty sequence → also true.',
        },
      ],
    },
  ],
};

const ch12Exceptions: Chapter = {
  id: 'ch12-exceptions',
  title: 'Exception Handling',
  description: 'Handle errors gracefully',
  icon: '⚠️',
  lessons: [
    {
      id: 'l44-exceptions-theory',
      title: 'try / catch / finally',
      type: 'theory',
      xp: 15,
      theory: `# Exceptions

When something goes wrong (file missing, divide by zero, null reference), C# **throws** an exception. Use \`try\` / \`catch\` to handle it.

\`\`\`csharp
try
{
    int x = int.Parse("not a number");
}
catch (FormatException ex)
{
    Console.WriteLine($"Bad input: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Something else went wrong: {ex.Message}");
}
finally
{
    Console.WriteLine("Always runs - cleanup here");
}
\`\`\`

## Common exceptions

| Type | When |
|------|------|
| \`ArgumentException\` | Bad argument value |
| \`ArgumentNullException\` | Argument is null |
| \`FormatException\` | Parse/format failed |
| \`InvalidOperationException\` | Object in wrong state |
| \`NullReferenceException\` | Dereferenced null |
| \`IndexOutOfRangeException\` | Array index out of bounds |
| \`DivideByZeroException\` | Integer / 0 |

## Throwing your own

\`\`\`csharp
if (age < 0) throw new ArgumentException("Age must be non-negative");
\`\`\`

## Catch order matters

Catch the **most specific** exceptions first - the runtime takes the first matching catch.`,
    },
    {
      id: 'l45-safe-divide',
      title: 'Safe Divide',
      type: 'challenge',
      xp: 40,
      challenge: {
        description: 'Implement integer division but return `-1` if the divisor is 0.\n\nUse a try/catch around `a / b`.',
        difficulty: 'easy',
        examples: [
          { input: '10, 2', output: '5' },
          { input: '7, 0', output: '-1', explanation: 'Division by zero - return sentinel.' },
          { input: '-9, 3', output: '-3' },
        ],
        functionName: 'SafeDivide',
        starterCode: `using System;

public class Solution
{
    public int SafeDivide(int a, int b)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int SafeDivide(int a, int b)
    {
        try
        {
            return a / b;
        }
        catch (DivideByZeroException)
        {
            return -1;
        }
    }
}`,
        testCases: [
          { input: '10, 2', expected: '5', description: '10 / 2 = 5' },
          { input: '7, 0', expected: '-1', description: '7 / 0 → -1' },
          { input: '-9, 3', expected: '-3', description: '-9 / 3 = -3' },
          { input: '100, 4', expected: '25', description: '100 / 4 = 25' },
          { input: '0, 5', expected: '0', description: '0 / 5 = 0' },
          { input: '0, 0', expected: '-1', description: '0 / 0 → -1' },
        ],
        hints: [
          'Wrap a / b inside try { ... }',
          'Catch DivideByZeroException and return -1',
          'You could also check `if (b == 0) return -1;` before dividing - both are valid',
        ],
      },
    },
    {
      id: 'l46-exceptions-quiz',
      title: 'Exceptions Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which block runs **whether or not** an exception was thrown?',
          options: ['try', 'catch', 'finally', 'throw'],
          correctIndex: 2,
          explanation: 'finally runs in both paths - perfect for cleanup like closing files.',
        },
        {
          question: 'Should you catch the most general exception type **first** or **last**?',
          options: ['First', 'Last', 'Order doesn\'t matter', 'Only catch general'],
          correctIndex: 1,
          explanation: 'Most specific first. The runtime takes the first matching catch, so catching Exception first would mask all the more specific ones.',
        },
        {
          question: 'What does `throw new ArgumentException("...")` do?',
          options: [
            'Logs an error and continues',
            'Returns from the method with a default',
            'Raises an exception that propagates up the call stack',
            'Shows a popup',
          ],
          correctIndex: 2,
          explanation: 'throw raises an exception. It unwinds the stack until something catches it (or the program crashes if nothing does).',
        },
      ],
    },
  ],
};

const ch13Milestone: Chapter = {
  id: 'ch13-milestone',
  title: 'Milestone Challenges',
  description: 'Combine everything you\'ve learned',
  icon: '🏆',
  lessons: [
    {
      id: 'l47-palindrome',
      title: 'Palindrome Check',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'A **palindrome** reads the same forwards and backwards.\n\nReturn `true` if the input string is a palindrome, ignoring case, **false** otherwise.\n\nFor simplicity, you do NOT need to ignore spaces or punctuation - only case.',
        difficulty: 'easy',
        examples: [
          { input: '"racecar"', output: 'True' },
          { input: '"Hello"', output: 'False' },
          { input: '"Madam"', output: 'True', explanation: 'Case is ignored: "madam" reversed is "madam".' },
        ],
        functionName: 'IsPalindrome',
        starterCode: `using System;
using System.Linq;

public class Solution
{
    public bool IsPalindrome(string s)
    {
        // your code here
        return false;
    }
}`,
        solution: `using System;
using System.Linq;

public class Solution
{
    public bool IsPalindrome(string s)
    {
        var lower = s.ToLower();
        return lower.SequenceEqual(lower.Reverse());
    }
}`,
        testCases: [
          { input: '"racecar"', expected: 'True', description: 'racecar' },
          { input: '"Hello"', expected: 'False', description: 'Hello (not palindrome)' },
          { input: '"Madam"', expected: 'True', description: 'Madam (case ignored)' },
          { input: '"a"', expected: 'True', description: 'Single char' },
          { input: '""', expected: 'True', description: 'Empty string' },
          { input: '"abcba"', expected: 'True', description: 'abcba' },
          { input: '"abcd"', expected: 'False', description: 'abcd' },
        ],
        hints: [
          'Lowercase first: `s.ToLower()`',
          'Compare the lowered string to its reverse',
          'Two ways: `lower == new string(lower.Reverse().ToArray())` or `lower.SequenceEqual(lower.Reverse())`',
        ],
      },
    },
    {
      id: 'l48-fibonacci',
      title: 'Fibonacci',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...\n\nEach number is the sum of the two before it.\n\nReturn the **n-th** Fibonacci number (0-indexed: F(0)=0, F(1)=1).',
        difficulty: 'medium',
        examples: [
          { input: '0', output: '0' },
          { input: '1', output: '1' },
          { input: '7', output: '13' },
          { input: '10', output: '55' },
        ],
        functionName: 'Fib',
        starterCode: `using System;

public class Solution
{
    public int Fib(int n)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int Fib(int n)
    {
        if (n < 2) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++)
        {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
        testCases: [
          { input: '0', expected: '0', description: 'F(0) = 0' },
          { input: '1', expected: '1', description: 'F(1) = 1' },
          { input: '2', expected: '1', description: 'F(2) = 1' },
          { input: '7', expected: '13', description: 'F(7) = 13' },
          { input: '10', expected: '55', description: 'F(10) = 55' },
          { input: '15', expected: '610', description: 'F(15) = 610' },
          { input: '20', expected: '6765', description: 'F(20) = 6765' },
        ],
        hints: [
          'Start with a = 0, b = 1',
          'Iterate: compute next = a + b, then shift a = b, b = next',
          'Avoid naive recursion - it\'s exponential. Use the iterative approach.',
        ],
      },
    },
    {
      id: 'l49-twosum',
      title: 'Two Sum',
      type: 'challenge',
      xp: 70,
      challenge: {
        description: 'Given an array of integers and a target, return the **indices** of the two numbers that add up to the target.\n\nReturn the indices as an int array `[i, j]` with `i < j`. You may assume exactly one solution exists.\n\nThis is a classic LeetCode #1 problem.',
        difficulty: 'medium',
        examples: [
          { input: '[2, 7, 11, 15], 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
          { input: '[3, 2, 4], 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
          { input: '[3, 3], 6', output: '[0, 1]' },
        ],
        functionName: 'TwoSum',
        starterCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        // your code here
        return new int[0];
    }
}`,
        solution: `using System;
using System.Collections.Generic;

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var seen = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            int need = target - nums[i];
            if (seen.ContainsKey(need)) return new int[] { seen[need], i };
            seen[nums[i]] = i;
        }
        return new int[0];
    }
}`,
        testCases: [
          { input: '[2, 7, 11, 15], 9', expected: '[0, 1]', description: '[2,7,11,15], 9 → [0,1]' },
          { input: '[3, 2, 4], 6', expected: '[1, 2]', description: '[3,2,4], 6 → [1,2]' },
          { input: '[3, 3], 6', expected: '[0, 1]', description: '[3,3], 6 → [0,1]' },
          { input: '[1, 2, 3, 4, 5], 9', expected: '[3, 4]', description: '[1..5], 9 → [3,4]' },
          { input: '[-3, 4, 3, 90], 0', expected: '[0, 2]', description: 'Negatives: [-3,4,3,90], 0 → [0,2]' },
        ],
        hints: [
          'Brute force is O(n²) - two nested loops. It works but can be slow.',
          'For O(n), use a Dictionary<int, int> mapping value → index. As you iterate, check if `target - current` is in the dictionary.',
          'Add to the dictionary AFTER checking, otherwise you might match the same index with itself',
        ],
      },
    },
  ],
};

const chCli: Chapter = {
  id: 'ch-cli',
  title: 'dotnet CLI & Project Types',
  description: 'How real C# projects are built and run',
  icon: '🛠️',
  lessons: [
    {
      id: 'l-cli-1',
      title: 'What is .NET?',
      type: 'theory',
      xp: 15,
      theory: `# What is .NET?

So far you've been writing C# in our browser playground. In the real world, C# code lives inside a **.NET project** built and run with the **dotnet CLI**.

## The pieces

| Piece | What it is |
|---|---|
| **C#** | The language you write |
| **.NET runtime** | The engine that runs your compiled code (the CLR) |
| **BCL** (Base Class Library) | The huge standard library: \`Console\`, \`List<T>\`, \`HttpClient\`, \`File\`, ... |
| **SDK** (Software Development Kit) | The tools: compiler, \`dotnet\` CLI, project templates |

## .NET Framework vs modern .NET

You'll see two names in the wild:

- **.NET Framework** (4.x) — Windows-only, legacy. Still alive in old enterprise apps.
- **.NET** 5 / 6 / 7 / 8 / 9+ — cross-platform (Windows, macOS, Linux), open source, the future. **This is what you should learn.**

Microsoft also used the name *.NET Core* for versions 1.0 - 3.1; in 5.0 they dropped "Core" and unified everything under just *.NET*.

## Versions you'll see

Modern .NET ships a new major version each November. Versions ending in even numbers (6, 8, 10) are **LTS** (Long-Term Support, 3 years). Odd-numbered ones (5, 7, 9) are 18-month "STS" releases.`,
    },
    {
      id: 'l-cli-2',
      title: 'The dotnet CLI',
      type: 'theory',
      xp: 15,
      theory: `# The \`dotnet\` CLI

Once you install the .NET SDK, you get a \`dotnet\` command. Everything in modern .NET starts with it.

## Most-used commands

\`\`\`bash
dotnet new console -o MyApp        # create a new console project in MyApp/
dotnet build                       # compile the current project
dotnet run                         # build + run
dotnet test                        # run tests
dotnet publish -c Release          # produce a deployable build
dotnet add package Newtonsoft.Json # add a NuGet dependency
dotnet restore                     # download dependencies (usually automatic)
dotnet --list-sdks                 # show installed SDK versions
\`\`\`

## A typical session

\`\`\`bash
mkdir hello && cd hello
dotnet new console
dotnet run
# Output: Hello, World!
\`\`\`

That's it. No IDE required.

## SDK vs runtime

- The **SDK** is for developers — it includes everything (compiler + runtime + templates).
- The **runtime** is for users running your published app — smaller, no compiler.

When you install ".NET SDK 8", the matching runtime comes along.`,
    },
    {
      id: 'l-cli-3',
      title: 'Project Types & csproj',
      type: 'theory',
      xp: 15,
      theory: `# Project Types

\`dotnet new\` ships a list of templates. The big ones:

| Template | What it builds |
|---|---|
| \`console\` | Command-line app |
| \`classlib\` | Reusable library (DLL) |
| \`web\` | ASP.NET Core web project (Minimal API) |
| \`webapi\` | REST API |
| \`mvc\` | ASP.NET Core MVC |
| \`razor\` | Razor Pages web app |
| \`xunit\` / \`nunit\` / \`mstest\` | Unit-test project |
| \`worker\` | Background-service / hosted-service app |
| \`maui\` | Cross-platform mobile + desktop |

Run \`dotnet new --list\` to see them all.

## The .csproj file

A C# project is described by a \`.csproj\` file — XML, but **modern .NET makes it tiny**:

\`\`\`xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>

</Project>
\`\`\`

Key parts:
- \`Sdk="Microsoft.NET.Sdk"\` — pulls in build defaults (auto-includes all \`.cs\` files in the folder)
- \`<TargetFramework>\` — what runtime version this app needs
- \`<PackageReference>\` — NuGet packages

## Solution files (.sln)

When you have multiple projects (an app + a library + tests), they're grouped in a **solution** (\`.sln\` file). \`dotnet new sln\` creates one; \`dotnet sln add MyApp.csproj\` registers a project.`,
    },
    {
      id: 'l-cli-4',
      title: 'CLI & Project Types Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which command creates a new console application?',
          options: ['dotnet create console', 'dotnet new console', 'dotnet init', 'dotnet start console'],
          correctIndex: 1,
          explanation: '`dotnet new <template>` is the project-creation command. The template name (`console`) chooses what gets scaffolded.',
        },
        {
          question: 'What does the SDK include that the runtime alone does not?',
          options: ['Only the BCL', 'The CLR', 'The C# compiler and project templates', 'Visual Studio'],
          correctIndex: 2,
          explanation: 'The SDK adds developer tools — compiler, CLI templates, build engine. The runtime by itself only runs already-compiled code.',
        },
        {
          question: 'Which is a Long-Term Support (LTS) version of .NET?',
          options: ['.NET 5', '.NET 7', '.NET 8', '.NET 9'],
          correctIndex: 2,
          explanation: 'Even-numbered modern .NET releases are LTS (supported for 3 years). 5, 7, 9 are STS (18 months). 8 and 10 are LTS.',
        },
        {
          question: 'In a modern .csproj, where do NuGet dependencies live?',
          options: ['<PackageReference> inside an <ItemGroup>', '<Reference> tags at the root', 'A separate packages.config file', 'In the .sln file'],
          correctIndex: 0,
          explanation: 'SDK-style csproj uses `<PackageReference>` items. The legacy `packages.config` file is from .NET Framework only.',
        },
      ],
    },
  ],
};

const chCasting: Chapter = {
  id: 'ch-casting',
  title: 'Type Conversion & Casting',
  description: 'Move values between types safely',
  icon: '🔄',
  lessons: [
    {
      id: 'l-cast-1',
      title: 'Implicit vs Explicit Conversion',
      type: 'theory',
      xp: 15,
      theory: `# Type Conversion

C# is strict about types — you can't just hand a \`string\` to an \`int\`. But the language gives you several ways to **convert** between them.

## Implicit (automatic, no syntax needed)

When the conversion is **safe** (no information lost), C# does it for you:

\`\`\`csharp
int small = 42;
long big = small;        // int → long: always fits, implicit
double d = small;        // int → double: implicit
\`\`\`

## Explicit cast \`(Type)value\`

When the conversion **might lose information**, you must opt in:

\`\`\`csharp
double d = 3.7;
int i = (int)d;          // truncates to 3 (NOT rounded)

long big = 999_999_999_999L;
int small = (int)big;    // overflow! produces garbage silently
\`\`\`

## checked / unchecked

By default integer overflow wraps silently. Wrap a cast in \`checked\` to throw on overflow:

\`\`\`csharp
checked
{
    int small = (int)big;  // throws OverflowException
}
\`\`\`

## Convert class & TryParse

For string ↔ number conversions use \`int.Parse\`, \`int.TryParse\`, or \`Convert.ToInt32\`:

\`\`\`csharp
int n = int.Parse("42");           // throws on bad input
bool ok = int.TryParse("42", out int x); // safe — returns false on bad input

int rounded = Convert.ToInt32(3.7); // rounds (4) instead of truncating
\`\`\``,
    },
    {
      id: 'l-cast-2',
      title: 'Practice: Convert User Input',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'You\'re given the string `"42.7"`. Convert it to a `double` and to an `int` (truncated), and print each on its own line.\n\nExpected output:\n```\n42.7\n42\n```',
        starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string raw = "42.7";
        // Convert to double, then truncate to int

    }
}
`,
        solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string raw = "42.7";
        double d = double.Parse(raw, CultureInfo.InvariantCulture);
        int i = (int)d;
        Console.WriteLine(d);
        Console.WriteLine(i);
    }
}`,
        tests: [{ expectedOutput: '42.7\n42', description: 'Parse to double then truncate to int' }],
        hints: [
          'Use double.Parse(raw, CultureInfo.InvariantCulture) so the dot is treated as a decimal separator',
          'To truncate a double to int use the explicit cast (int)d',
        ],
      },
    },
    {
      id: 'l-cast-3',
      title: 'Casting Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What is the value of `(int)3.9`?',
          options: ['3', '4', '3.9', 'Compile error'],
          correctIndex: 0,
          explanation: 'Casting a double to int truncates toward zero — the .9 is dropped. Use Convert.ToInt32 or Math.Round if you want rounding.',
        },
        {
          question: 'Which is the SAFE way to parse a possibly-bad string?',
          options: ['int.Parse(s)', 'int.TryParse(s, out var n)', '(int)s', 'Convert.ToInt32(s)'],
          correctIndex: 1,
          explanation: 'TryParse returns a bool indicating success and writes the value into an out parameter — it never throws. The others throw FormatException on bad input.',
        },
        {
          question: 'What happens with `(int)long.MaxValue` by default?',
          options: ['Throws OverflowException', 'Compile error', 'Wraps silently to a garbage value', 'Returns int.MaxValue'],
          correctIndex: 2,
          explanation: 'By default, integer overflow wraps silently. Wrap the cast in `checked { ... }` to throw on overflow instead.',
        },
      ],
    },
  ],
};

const chMethodParams: Chapter = {
  id: 'ch-method-params',
  title: 'Method Parameters Deep Dive',
  description: 'ref, out, in, and params',
  icon: '🎯',
  lessons: [
    {
      id: 'l-mp-1',
      title: 'ref, out, in, params',
      type: 'theory',
      xp: 15,
      theory: `# Parameter Modifiers

By default, parameters are passed **by value** — the method gets a *copy*. Modifiers change that.

## \`ref\` — pass by reference

The method can read **and modify** the caller's variable:

\`\`\`csharp
static void Double(ref int n) { n *= 2; }

int x = 5;
Double(ref x);
Console.WriteLine(x); // 10
\`\`\`

The variable must be **initialized before** you pass it.

## \`out\` — return extra values

Like \`ref\`, but the variable does **not** need to be initialized first; the method **must** assign it:

\`\`\`csharp
static bool TryDivide(int a, int b, out int result)
{
    if (b == 0) { result = 0; return false; }
    result = a / b;
    return true;
}

if (TryDivide(10, 2, out int q))
    Console.WriteLine(q); // 5
\`\`\`

C# 7+ lets you declare the variable inline: \`out int q\`.

## \`in\` — read-only by reference

Same as \`ref\` but the method can't modify it. Useful for big \`struct\`s where you want pass-by-reference performance without giving up immutability:

\`\`\`csharp
static double Magnitude(in Vector3 v) { ... }
\`\`\`

## \`params\` — variable-length argument list

Lets the method accept any number of args of one type:

\`\`\`csharp
static int Sum(params int[] nums)
{
    int total = 0;
    foreach (var n in nums) total += n;
    return total;
}

Sum();              // 0
Sum(1, 2, 3);       // 6
Sum(new int[]{1,2});// 3 (you can also pass an actual array)
\`\`\`

\`params\` must be the **last** parameter.`,
    },
    {
      id: 'l-mp-2',
      title: 'Practice: Use out',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'The method `TryDivide(int a, int b, out int result)` is given. Use it to divide 100 by 7 and print the result. If the divisor were 0 you should print "cannot divide" instead.\n\nThe call already passes 100, 7. Just print the result.\n\nExpected output:\n```\n14\n```',
        starterCode: `using System;

class Program
{
    static bool TryDivide(int a, int b, out int result)
    {
        if (b == 0) { result = 0; return false; }
        result = a / b;
        return true;
    }

    static void Main()
    {
        // Call TryDivide(100, 7, out var q) and print accordingly

    }
}
`,
        solution: `using System;

class Program
{
    static bool TryDivide(int a, int b, out int result)
    {
        if (b == 0) { result = 0; return false; }
        result = a / b;
        return true;
    }

    static void Main()
    {
        if (TryDivide(100, 7, out int q))
            Console.WriteLine(q);
        else
            Console.WriteLine("cannot divide");
    }
}`,
        tests: [{ expectedOutput: '14', description: '100 / 7 = 14' }],
        hints: [
          'Use `out int q` inline to declare the variable in the call',
          'Wrap the call in an if to branch on success',
        ],
      },
    },
    {
      id: 'l-mp-3',
      title: 'Variadic Sum Challenge',
      type: 'challenge',
      xp: 35,
      challenge: {
        description: 'Implement `int SumAll(int[] nums)` — return the sum of every value in the array.\n\nIn idiomatic C# you would write this with a `params int[]` parameter so callers could write `SumAll(1, 2, 3)`. For testing convenience the harness passes an `int[]` directly.\n\nReturn 0 for an empty array.',
        difficulty: 'easy',
        examples: [
          { input: '[1, 2, 3]', output: '6' },
          { input: '[]', output: '0' },
          { input: '[10]', output: '10' },
        ],
        functionName: 'SumAll',
        starterCode: `using System;

public class Solution
{
    public int SumAll(int[] nums)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int SumAll(int[] nums)
    {
        int total = 0;
        foreach (var n in nums) total += n;
        return total;
    }
}`,
        testCases: [
          { input: '[1, 2, 3]', expected: '6', description: 'Three positives' },
          { input: '[]', expected: '0', description: 'Empty' },
          { input: '[10]', expected: '10', description: 'Single' },
          { input: '[-1, 1, -1, 1]', expected: '0', description: 'Cancelling negatives' },
          { input: '[100, 200, 300, 400, 500]', expected: '1500', description: 'Five values' },
        ],
        hints: [
          'Use foreach to walk the array',
          'Or use LINQ: `nums.Sum()` (after `using System.Linq;`)',
        ],
      },
    },
    {
      id: 'l-mp-4',
      title: 'Method Parameters Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the difference between `ref` and `out`?',
          options: [
            'No difference, they\'re aliases',
            'ref needs the variable initialized before; out requires the method to assign it',
            'out is read-only inside the method',
            'ref can only be used with structs',
          ],
          correctIndex: 1,
          explanation: 'With ref you must initialize before; the method may read or write. With out you don\'t need to initialize, but the method must assign before it returns.',
        },
        {
          question: 'Which modifier passes a struct by reference but forbids modification?',
          options: ['ref', 'out', 'in', 'const'],
          correctIndex: 2,
          explanation: '`in` is read-only by-reference. Useful for performance with big structs without sacrificing immutability.',
        },
        {
          question: 'Where must `params` appear in the parameter list?',
          options: ['First', 'Anywhere', 'Last', 'It can\'t coexist with other params'],
          correctIndex: 2,
          explanation: 'A method can have only one params, and it must be the last parameter — otherwise the compiler couldn\'t tell where the variadic args start.',
        },
      ],
    },
  ],
};

const chConsoleIO: Chapter = {
  id: 'ch-console-io',
  title: 'Console I/O Beyond WriteLine',
  description: 'Formatting, alignment, and the limits of stdin',
  icon: '🖨️',
  lessons: [
    {
      id: 'l-cio-1',
      title: 'Write vs WriteLine vs Format',
      type: 'theory',
      xp: 15,
      theory: `# Console output, deeper

You already know \`Console.WriteLine\`. Three more useful members:

## \`Console.Write\` — no newline

\`\`\`csharp
Console.Write("Hi");
Console.Write(" there");      // -> Hi there
Console.WriteLine("!");       // -> Hi there!
\`\`\`

## Composite formatting with \`{0}\`, \`{1}\`...

\`\`\`csharp
string name = "Alice";
int age = 28;
Console.WriteLine("Hello, {0}! You are {1}.", name, age);
\`\`\`

This is the older sibling of string interpolation (\`$"..."\`). They produce identical output. Interpolation reads better; composite is occasionally useful for templates.

## Alignment & format specifiers

\`\`\`csharp
Console.WriteLine("{0,-10} {1,5}", "Item", "Qty");
Console.WriteLine("{0,-10} {1,5}", "Apples", 3);
Console.WriteLine("{0,-10} {1,5}", "Pears", 12);
// Item            Qty
// Apples            3
// Pears            12
\`\`\`

- \`{0,-10}\` — pad value 0 to width 10, **left-aligned** (negative)
- \`{1,5}\` — pad value 1 to width 5, **right-aligned** (positive)

Format specifiers control representation:

\`\`\`csharp
Console.WriteLine("{0:F2}", Math.PI);    // 3.14    (fixed, 2 decimals)
Console.WriteLine("{0:N0}", 1234567);    // 1,234,567
Console.WriteLine("{0:X}", 255);         // FF
Console.WriteLine("{0:P1}", 0.275);      // 27.5 %
\`\`\`

Same specifiers work in interpolation: \`$"{Math.PI:F2}"\`.

## A note on stdin

In our browser playground there's no real keyboard — \`Console.ReadLine()\` returns \`null\`. In a local console app it would block waiting for the user to type and press Enter:

\`\`\`csharp
Console.Write("Your name: ");
string? name = Console.ReadLine();
\`\`\`

When you run programs locally with \`dotnet run\`, this works.`,
    },
    {
      id: 'l-cio-2',
      title: 'Practice: Formatted Table',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Print a small table using composite formatting. Use width 10 left-aligned for the label and width 5 right-aligned for the number, separated by a literal `|`.\n\nFormat string: `"{0,-10}|{1,5}"`\n\nExpected output:\n```\nApples    |    3\nPears     |   12\nGrapes    |  125\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        // Use Console.WriteLine("{0,-10}|{1,5}", label, number);

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("{0,-10}|{1,5}", "Apples", 3);
        Console.WriteLine("{0,-10}|{1,5}", "Pears", 12);
        Console.WriteLine("{0,-10}|{1,5}", "Grapes", 125);
    }
}`,
        tests: [
          {
            expectedOutput: 'Apples    |    3\nPears     |   12\nGrapes    |  125',
            description: 'Aligned table with pipe separator',
          },
        ],
        hints: [
          'The format string is "{0,-10}|{1,5}" — the comma plus number is the alignment width',
          'Negative width means left-align; positive means right-align',
        ],
      },
    },
    {
      id: 'l-cio-3',
      title: 'Console I/O Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the difference between Console.Write and Console.WriteLine?',
          options: [
            'WriteLine is faster',
            'WriteLine adds a newline at the end; Write does not',
            'Write is for numbers, WriteLine for strings',
            'There is no difference',
          ],
          correctIndex: 1,
          explanation: 'WriteLine appends Environment.NewLine. Write outputs exactly what you give it.',
        },
        {
          question: 'In `{0,-8:F2}`, what does the `-8` mean?',
          options: [
            'Negative number prefix',
            'Right-align in 8 characters',
            'Left-align in 8 characters',
            'Truncate to 8 characters',
          ],
          correctIndex: 2,
          explanation: 'Comma + number is the alignment width. Negative = left-align; positive = right-align. The `:F2` after is the format specifier (fixed-point, 2 decimals).',
        },
        {
          question: 'In our browser playground, what does Console.ReadLine() return?',
          options: ['Whatever the user types', 'An empty string', 'null (no stdin)', 'It blocks forever'],
          correctIndex: 2,
          explanation: 'There\'s no keyboard attached to the sandbox process, so the input stream is closed and ReadLine returns null. In a local terminal it would block waiting for input.',
        },
      ],
    },
  ],
};

const chStringsAdv: Chapter = {
  id: 'ch-strings-adv',
  title: 'Strings Advanced',
  description: 'StringBuilder, formatting, parsing',
  icon: '🧵',
  lessons: [
    {
      id: 'l-sa-1',
      title: 'Why Strings Are Immutable',
      type: 'theory',
      xp: 15,
      theory: `# Strings are immutable

In C#, every \`string\` is **immutable** — once created, its bytes never change. Methods like \`Replace\` or \`ToUpper\` return *new* strings.

\`\`\`csharp
string a = "hello";
a.ToUpper();          // returns "HELLO" but you discarded it
Console.WriteLine(a); // still "hello"

string b = a.ToUpper();
Console.WriteLine(b); // "HELLO"
\`\`\`

## Why this matters: hidden allocations

Concatenating in a loop with \`+\` is **slow** and wasteful:

\`\`\`csharp
string s = "";
for (int i = 0; i < 1000; i++)
    s += i;          // creates a NEW string each time, throws away the old one
\`\`\`

That's 1000 allocations and 1000 garbage strings.

## StringBuilder — mutable buffer

For loops, use \`System.Text.StringBuilder\`:

\`\`\`csharp
using System.Text;

var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);

string final = sb.ToString();
\`\`\`

One buffer, one final string. Orders of magnitude faster for big loops.

## When to NOT bother

For just a handful of concatenations, \`+\` or \`$"..."\` is fine — the JIT and the BCL optimize them. Reach for StringBuilder when you have a **loop** or **dynamic count**.`,
    },
    {
      id: 'l-sa-2',
      title: 'Practice: Build a CSV Line',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Use a `StringBuilder` to build a comma-separated string of the numbers 1 through 5. Print the result.\n\nExpected output:\n```\n1,2,3,4,5\n```',
        starterCode: `using System;
using System.Text;

class Program
{
    static void Main()
    {
        var sb = new StringBuilder();
        // Append 1..5, separated by commas, no trailing comma

        Console.WriteLine(sb.ToString());
    }
}
`,
        solution: `using System;
using System.Text;

class Program
{
    static void Main()
    {
        var sb = new StringBuilder();
        for (int i = 1; i <= 5; i++)
        {
            if (i > 1) sb.Append(',');
            sb.Append(i);
        }
        Console.WriteLine(sb.ToString());
    }
}`,
        tests: [{ expectedOutput: '1,2,3,4,5', description: 'Comma-separated 1..5' }],
        hints: [
          'Append the comma BEFORE the number when i > 1, so there\'s no leading or trailing comma',
          'Or: append number then comma in the loop, then call sb.Length-- at the end to drop the last char',
        ],
      },
    },
    {
      id: 'l-sa-3',
      title: 'CSV Parsing Challenge',
      type: 'challenge',
      xp: 45,
      challenge: {
        description: 'Parse a comma-separated string into an array of trimmed values.\n\nFor example, the input `" apple , banana , cherry "` should return `["apple", "banana", "cherry"]`.\n\nReturn an empty array for an empty string.',
        difficulty: 'easy',
        examples: [
          { input: '"apple,banana,cherry"', output: '["apple", "banana", "cherry"]' },
          { input: '" a , b , c "', output: '["a", "b", "c"]', explanation: 'Whitespace around each value is trimmed.' },
          { input: '""', output: '[]' },
        ],
        functionName: 'ParseCsv',
        starterCode: `using System;

public class Solution
{
    public string[] ParseCsv(string input)
    {
        // your code here
        return new string[0];
    }
}`,
        solution: `using System;

public class Solution
{
    public string[] ParseCsv(string input)
    {
        if (string.IsNullOrEmpty(input)) return new string[0];
        var parts = input.Split(',');
        for (int i = 0; i < parts.Length; i++) parts[i] = parts[i].Trim();
        return parts;
    }
}`,
        testCases: [
          { input: '"apple,banana,cherry"', expected: '["apple", "banana", "cherry"]', description: 'Three plain values' },
          { input: '" a , b , c "', expected: '["a", "b", "c"]', description: 'With whitespace' },
          { input: '""', expected: '[]', description: 'Empty string' },
          { input: '"single"', expected: '["single"]', description: 'No commas' },
          { input: '"a,b"', expected: '["a", "b"]', description: 'Two values' },
        ],
        hints: [
          'Use string.Split(\',\')',
          'Walk the array and call .Trim() on each entry to drop surrounding whitespace',
          'Handle the empty-string case explicitly — Split would return [""]',
        ],
      },
    },
    {
      id: 'l-sa-4',
      title: 'Strings Advanced Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does StringBuilder beat regular string concatenation?',
          options: [
            'For any concatenation',
            'In loops or when the count is unknown',
            'Only for numbers',
            'Never — `+` is always faster',
          ],
          correctIndex: 1,
          explanation: 'StringBuilder shines in loops and dynamic-count scenarios. For a few concats the regular `+` or `$"..."` is fine and clearer.',
        },
        {
          question: '`"hello".Replace("l", "L")` — what happens to the original `"hello"`?',
          options: [
            'It changes to "heLLo"',
            'Nothing — strings are immutable, Replace returns a new string',
            'The compiler errors',
            'It depends on .NET version',
          ],
          correctIndex: 1,
          explanation: 'C# strings are immutable. All "modifying" methods return new strings; the original is unchanged.',
        },
        {
          question: 'What namespace lives `StringBuilder` in?',
          options: ['System', 'System.Text', 'System.Strings', 'System.IO'],
          correctIndex: 1,
          explanation: '`using System.Text;` brings in StringBuilder.',
        },
      ],
    },
  ],
};

const chAccess: Chapter = {
  id: 'ch-access',
  title: 'Access Modifiers & Namespaces',
  description: 'Visibility and code organization',
  icon: '🔒',
  lessons: [
    {
      id: 'l-am-1',
      title: 'Access Modifiers',
      type: 'theory',
      xp: 15,
      theory: `# Access Modifiers

Modifiers control **who can see / use** a type or member.

| Modifier | Visible from |
|---|---|
| \`public\` | Anywhere |
| \`private\` | Same class only |
| \`protected\` | Same class and **subclasses** |
| \`internal\` | Same **assembly** (DLL/EXE) only |
| \`protected internal\` | Same assembly OR subclasses |
| \`private protected\` | Subclasses **within** the same assembly |

## Defaults (memorize these!)

- Top-level **types** default to \`internal\`
- Class **members** default to \`private\`

\`\`\`csharp
class Foo            // implicitly internal
{
    int x;           // implicitly private
}
\`\`\`

Most code says it explicitly because the defaults often surprise newcomers.

## Encapsulation in practice

\`\`\`csharp
public class Counter
{
    private int _count;            // hidden state
    public int Count => _count;    // read-only public view
    public void Increment() => _count++;
}

var c = new Counter();
c.Increment();
Console.WriteLine(c.Count);  // 1
// c._count = 99;            // compile error: private
\`\`\`

The private field is the implementation; the public method/property is the contract.

## Convention: \`_camelCase\` for private fields

Most C# codebases prefix private fields with an underscore so they don't shadow public properties of similar name.`,
    },
    {
      id: 'l-am-2',
      title: 'Namespaces & using',
      type: 'theory',
      xp: 15,
      theory: `# Namespaces

A **namespace** groups related types and prevents name clashes. The BCL is split across namespaces like \`System\`, \`System.Collections.Generic\`, \`System.IO\`, etc.

## Declaring

\`\`\`csharp
namespace MyApp.Domain
{
    public class Order { }
}
\`\`\`

Or with **file-scoped** syntax (C# 10+ — concise, less indentation):

\`\`\`csharp
namespace MyApp.Domain;

public class Order { }
\`\`\`

## using directives

\`using\` brings names from a namespace into scope so you don't have to fully qualify them:

\`\`\`csharp
// Without using:
System.Collections.Generic.List<int> nums = new System.Collections.Generic.List<int>();

// With:
using System.Collections.Generic;
List<int> nums = new List<int>();
\`\`\`

## Aliases

Resolve clashes by giving a type a local nickname:

\`\`\`csharp
using ConsoleColor = System.ConsoleColor;
using Project = System.IO.Path;   // silly but legal
\`\`\`

## Global usings (modern .NET)

In a \`.csproj\` you can mark a using as global so it applies to **every** \`.cs\` file in the project:

\`\`\`xml
<ItemGroup>
  <Using Include="System.Linq" />
</ItemGroup>
\`\`\`

The SDK already imports common ones (\`System\`, \`System.Linq\`, etc.) under \`<ImplicitUsings>enable</ImplicitUsings>\`.`,
    },
    {
      id: 'l-am-3',
      title: 'Access & Namespaces Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What is the default access modifier for a top-level class?',
          options: ['public', 'private', 'internal', 'protected'],
          correctIndex: 2,
          explanation: 'Top-level types default to internal — visible only inside the same assembly. Members default to private.',
        },
        {
          question: 'Which modifier lets a subclass see a member but hides it from unrelated classes?',
          options: ['private', 'protected', 'internal', 'public'],
          correctIndex: 1,
          explanation: '`protected` is for inheritance. `private` would hide it even from subclasses.',
        },
        {
          question: '`using System.Linq;` does what?',
          options: [
            'Loads the LINQ library at runtime',
            'Brings types and extension methods from `System.Linq` into scope',
            'Locks the LINQ namespace from being modified',
            'Makes the file private',
          ],
          correctIndex: 1,
          explanation: '`using` is purely a compile-time alias. Library loading happens via assembly references, which the SDK handles separately.',
        },
        {
          question: 'In C# 10+, what does the file-scoped namespace look like?',
          options: [
            '`namespace MyApp;`',
            '`namespace MyApp { ... }`',
            '`package MyApp;`',
            '`module MyApp;`',
          ],
          correctIndex: 0,
          explanation: 'File-scoped namespaces use a semicolon after the name and remove a level of indentation. The block-style is still valid.',
        },
      ],
    },
  ],
};

const chEnums: Chapter = {
  id: 'ch-enums',
  title: 'Enums & [Flags]',
  description: 'Named constants and bit fields',
  icon: '🎚️',
  lessons: [
    {
      id: 'l-en-1',
      title: 'Enums Basics',
      type: 'theory',
      xp: 15,
      theory: `# Enums

An \`enum\` declares a set of **named integer constants**:

\`\`\`csharp
enum Day { Sun, Mon, Tue, Wed, Thu, Fri, Sat }

Day d = Day.Wed;
Console.WriteLine(d);          // "Wed"
Console.WriteLine((int)d);     // 3
\`\`\`

Values default to 0, 1, 2... You can override:

\`\`\`csharp
enum Status
{
    Pending = 1,
    Approved = 2,
    Rejected = 4,
    Archived = 100
}
\`\`\`

## Casting

Enums are explicitly convertible to/from their underlying integer type:

\`\`\`csharp
int n = (int)Status.Approved;        // 2
Status s = (Status)2;                // Status.Approved
Status weird = (Status)999;          // legal! produces undefined enum value
\`\`\`

The last case shows an enum gotcha: any int casts cleanly even if it's not a defined value. Validate at boundaries with \`Enum.IsDefined\`:

\`\`\`csharp
if (!Enum.IsDefined(typeof(Status), n))
    throw new ArgumentException("bad status");
\`\`\`

## Switch on enums

\`\`\`csharp
switch (s)
{
    case Status.Pending:  Console.WriteLine("waiting"); break;
    case Status.Approved: Console.WriteLine("good");    break;
    default:              Console.WriteLine("other");   break;
}
\`\`\`

## Underlying type

Enums default to \`int\`. You can pick a different integer type:

\`\`\`csharp
enum SmallStatus : byte { A, B, C }   // each value fits in 1 byte
\`\`\``,
    },
    {
      id: 'l-en-2',
      title: 'Practice: Use an Enum',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Define an enum `TrafficLight` with values `Red`, `Yellow`, `Green`. In `Main`, set a variable to `TrafficLight.Yellow` and use a `switch` to print:\n- `STOP` for Red\n- `SLOW` for Yellow\n- `GO` for Green\n\nExpected output:\n```\nSLOW\n```',
        starterCode: `using System;

class Program
{
    // Define the TrafficLight enum here

    static void Main()
    {
        TrafficLight light = TrafficLight.Yellow;
        // switch on light and print accordingly

    }
}
`,
        solution: `using System;

class Program
{
    enum TrafficLight { Red, Yellow, Green }

    static void Main()
    {
        TrafficLight light = TrafficLight.Yellow;
        switch (light)
        {
            case TrafficLight.Red: Console.WriteLine("STOP"); break;
            case TrafficLight.Yellow: Console.WriteLine("SLOW"); break;
            case TrafficLight.Green: Console.WriteLine("GO"); break;
        }
    }
}`,
        tests: [{ expectedOutput: 'SLOW', description: 'Yellow → SLOW' }],
        hints: [
          'Declare the enum INSIDE class Program (or outside it, both work)',
          'switch (light) { case TrafficLight.Yellow: ... break; }',
        ],
      },
    },
    {
      id: 'l-en-3',
      title: '[Flags] Challenge',
      type: 'challenge',
      xp: 45,
      challenge: {
        description: 'A `[Flags]` enum lets you combine values with bitwise OR. Each member uses a distinct power-of-two value so they don\'t overlap.\n\nGiven an integer `mask` (the OR\'d value of one or more permission bits), return a sorted comma-separated string of the permission names contained in it.\n\nThe permissions:\n- `Read = 1`\n- `Write = 2`\n- `Execute = 4`\n- `Delete = 8`\n\nFor example, `mask = 5` (Read | Execute) → `"Execute,Read"` (alphabetical).\n\nReturn `"None"` for `mask = 0`.',
        difficulty: 'medium',
        examples: [
          { input: '0', output: 'None' },
          { input: '1', output: 'Read' },
          { input: '5', output: 'Execute,Read', explanation: '1 | 4 = Read | Execute' },
          { input: '15', output: 'Delete,Execute,Read,Write', explanation: 'All four' },
        ],
        functionName: 'DescribeMask',
        starterCode: `using System;
using System.Linq;

public class Solution
{
    public string DescribeMask(int mask)
    {
        // Bits: 1=Read, 2=Write, 4=Execute, 8=Delete
        // Return sorted names joined by "," or "None"
        return "";
    }
}`,
        solution: `using System;
using System.Linq;
using System.Collections.Generic;

public class Solution
{
    public string DescribeMask(int mask)
    {
        if (mask == 0) return "None";
        var names = new List<string>();
        if ((mask & 1) != 0) names.Add("Read");
        if ((mask & 2) != 0) names.Add("Write");
        if ((mask & 4) != 0) names.Add("Execute");
        if ((mask & 8) != 0) names.Add("Delete");
        names.Sort();
        return string.Join(",", names);
    }
}`,
        testCases: [
          { input: '0', expected: 'None', description: 'Empty mask' },
          { input: '1', expected: 'Read', description: 'Just Read' },
          { input: '5', expected: 'Execute,Read', description: 'Read | Execute' },
          { input: '15', expected: 'Delete,Execute,Read,Write', description: 'All four' },
          { input: '8', expected: 'Delete', description: 'Just Delete' },
          { input: '10', expected: 'Delete,Write', description: 'Write | Delete' },
        ],
        hints: [
          'Test each bit with `(mask & N) != 0`',
          'Collect names in a List<string>, then List.Sort() to alphabetize, then string.Join(",", list)',
          'Return "None" early when mask == 0',
        ],
      },
    },
    {
      id: 'l-en-4',
      title: 'Enums Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What is the default underlying type for a C# enum?',
          options: ['byte', 'short', 'int', 'long'],
          correctIndex: 2,
          explanation: 'Enums default to `int`. You can specify a smaller type with `enum X : byte { ... }`.',
        },
        {
          question: 'What does `(Color)999` produce when `Color` only defines `Red`, `Green`, `Blue`?',
          options: [
            'Compile error',
            'Runtime ArgumentException',
            'A Color value of 999 with no name',
            'The closest defined value',
          ],
          correctIndex: 2,
          explanation: 'Casts from int to enum succeed even if the int isn\'t defined. Use Enum.IsDefined to validate.',
        },
        {
          question: 'In a `[Flags]` enum, why are values usually powers of two (1, 2, 4, 8...)?',
          options: [
            'Performance',
            'So they can be combined with bitwise OR without overlapping',
            'Compiler requirement',
            'They aren\'t — any values work',
          ],
          correctIndex: 1,
          explanation: 'Each flag occupies a unique bit. Combining with `|` and testing with `&` only works cleanly when bits don\'t overlap.',
        },
      ],
    },
  ],
};

const chGenerics: Chapter = {
  id: 'ch-generics',
  title: 'Generics',
  description: 'Code that works for any type',
  icon: '🧬',
  lessons: [
    {
      id: 'l-gen-1',
      title: 'Why Generics?',
      type: 'theory',
      xp: 15,
      theory: `# Generics

You've already used \`List<int>\` and \`Dictionary<string, int>\`. The thing in the angle brackets is a **type parameter**. The list itself is generic; you specialize it at the call site.

## The problem generics solve

Imagine you want a "box that holds one thing". Without generics:

\`\`\`csharp
class IntBox  { public int    Value; }
class TextBox { public string Value; }
class CarBox  { public Car    Value; }
\`\`\`

Three classes, identical structure. Painful.

The pre-generics escape hatch was \`object\`:

\`\`\`csharp
class Box { public object Value; }     // works for any type
var b = new Box { Value = 5 };
int n = (int)b.Value;                  // explicit cast — error-prone
\`\`\`

You lose **compile-time type safety** and pay for **boxing** (more on that later).

## With generics

\`\`\`csharp
class Box<T>
{
    public T Value;
}

var ib = new Box<int>    { Value = 5 };       // T is int
var sb = new Box<string> { Value = "hi" };    // T is string

int n = ib.Value;     // no cast needed
// int x = sb.Value;  // compile error: string is not int
\`\`\`

The compiler enforces the type. No casts. No boxing.

## Where T appears

\`T\` is just a name — by convention single-letter PascalCase. You can use it for fields, method params, return types, anywhere a type is expected:

\`\`\`csharp
class Stack<T>
{
    private List<T> _items = new();
    public void Push(T item)   => _items.Add(item);
    public T Pop()             { var x = _items[^1]; _items.RemoveAt(_items.Count - 1); return x; }
    public int Count           => _items.Count;
}
\`\`\``,
    },
    {
      id: 'l-gen-2',
      title: 'Generic Methods & Constraints',
      type: 'theory',
      xp: 15,
      theory: `# Generic Methods

A method (not a class) can be generic on its own:

\`\`\`csharp
static T First<T>(T[] items)
{
    return items[0];
}

int  i = First<int>(new[] { 1, 2, 3 });    // explicit
int  j = First(new[] { 1, 2, 3 });         // inferred (no <int> needed)
string s = First(new[] { "a", "b" });
\`\`\`

The compiler **infers** \`T\` from the arguments — usually you skip the angle brackets.

## Constraints — \`where T : ...\`

Sometimes \`T\` needs more capability than "any type". A constraint adds a contract:

\`\`\`csharp
static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}
\`\`\`

Now \`T\` is guaranteed to have \`CompareTo\`. Common constraints:

| Constraint | Means |
|---|---|
| \`where T : class\` | T must be a reference type |
| \`where T : struct\` | T must be a value type |
| \`where T : new()\` | T must have a parameterless constructor |
| \`where T : SomeBase\` | T must be SomeBase or derive from it |
| \`where T : IComparable<T>\` | T must implement an interface |
| \`where T : notnull\` | T can't be a nullable type |

You can stack them:

\`\`\`csharp
static T Build<T>() where T : class, new() => new T();
\`\`\`

## Multiple type parameters

\`\`\`csharp
static TOut Convert<TIn, TOut>(TIn input, Func<TIn, TOut> map) => map(input);

int len = Convert("hello", s => s.Length);  // TIn=string, TOut=int
\`\`\``,
    },
    {
      id: 'l-gen-3',
      title: 'Build a Pair<T>',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Define a generic class `Pair<T>` with two `T` fields named `First` and `Second`, plus a `Swap()` method that swaps them.\n\n`Main()` already creates a `Pair<int>(1, 2)`, prints it, swaps, then prints again.\n\nExpected output:\n```\n1 2\n2 1\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        var p = new Pair<int>(1, 2);
        Console.WriteLine(p.First + " " + p.Second);
        p.Swap();
        Console.WriteLine(p.First + " " + p.Second);
    }
}

// Define Pair<T> below — needs:
//   public T First, Second
//   public Pair(T first, T second)
//   public void Swap()
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        var p = new Pair<int>(1, 2);
        Console.WriteLine(p.First + " " + p.Second);
        p.Swap();
        Console.WriteLine(p.First + " " + p.Second);
    }
}

class Pair<T>
{
    public T First;
    public T Second;
    public Pair(T first, T second)
    {
        First = first;
        Second = second;
    }
    public void Swap()
    {
        T tmp = First;
        First = Second;
        Second = tmp;
    }
}`,
        tests: [{ expectedOutput: '1 2\n2 1', description: 'Pair created and swapped' }],
        hints: [
          'Place T in the angle brackets after the class name: class Pair<T>',
          'Use T as the type for fields and constructor parameters',
          'In Swap, store First in a temp T variable',
        ],
      },
    },
    {
      id: 'l-gen-4',
      title: 'Generics Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why prefer `List<int>` over `ArrayList`?',
          options: [
            'List<int> is faster to construct',
            'List<int> is type-safe at compile time and avoids boxing for value types',
            'ArrayList does not exist in .NET',
            'List<int> uses less memory always',
          ],
          correctIndex: 1,
          explanation: 'Generics give you compile-time type checks AND avoid the boxing overhead that ArrayList\'s `object` storage forces on value types.',
        },
        {
          question: 'What does the constraint `where T : new()` mean?',
          options: [
            'T must be a value type',
            'T must have a public parameterless constructor',
            'T must be brand new (.NET 5+ types)',
            'T must implement INotifyPropertyChanged',
          ],
          correctIndex: 1,
          explanation: '`new()` lets you write `new T()` inside the generic body. The compiler enforces that T has a parameterless ctor.',
        },
        {
          question: 'In `static T First<T>(T[] items)`, what makes the compiler infer T?',
          options: [
            'The variable name on the left',
            'The runtime type of the first item',
            'The argument types passed at the call site',
            'You always have to specify it explicitly',
          ],
          correctIndex: 2,
          explanation: 'Type inference looks at the arguments. `First(new[]{1,2,3})` infers T = int.',
        },
        {
          question: 'Which constraint should you add to call `.CompareTo` on T?',
          options: [
            'where T : class',
            'where T : new()',
            'where T : IComparable<T>',
            'where T : object',
          ],
          correctIndex: 2,
          explanation: '`IComparable<T>` is the interface that provides CompareTo. Without the constraint the compiler doesn\'t know T has the method.',
        },
      ],
    },
  ],
};

const chCollections: Chapter = {
  id: 'ch-collections',
  title: 'Collections Tour',
  description: 'Dictionary, HashSet, Queue, Stack',
  icon: '🗂️',
  lessons: [
    {
      id: 'l-col-1',
      title: 'Dictionary<TKey, TValue>',
      type: 'theory',
      xp: 15,
      theory: `# Dictionary<TKey, TValue>

A **hash map** — fast lookups by key. O(1) average for add, get, and contains.

\`\`\`csharp
using System.Collections.Generic;

var ages = new Dictionary<string, int>();
ages["Alice"] = 30;
ages["Bob"]   = 25;

Console.WriteLine(ages["Alice"]);    // 30
Console.WriteLine(ages.Count);       // 2

// Existence check
if (ages.ContainsKey("Carol"))
    Console.WriteLine(ages["Carol"]);

// Safe lookup — TryGetValue is the idiomatic way
if (ages.TryGetValue("Bob", out int bobAge))
    Console.WriteLine(bobAge);

// Iterate
foreach (var kv in ages)
    Console.WriteLine($"{kv.Key} = {kv.Value}");

// Remove
ages.Remove("Alice");
\`\`\`

## Initializer syntax

\`\`\`csharp
var caps = new Dictionary<string, string>
{
    ["USA"] = "Washington, DC",
    ["UK"]  = "London",
    ["JP"]  = "Tokyo"
};
\`\`\`

## Indexer pitfalls

\`dict[key]\` throws \`KeyNotFoundException\` if the key is missing for a *read*, but **silently inserts** on a *write*. Use \`TryGetValue\` for reads when you can't be sure.

## When NOT to use

- When you need to walk in **insertion order** → use \`List<KeyValuePair<...>>\` or \`SortedDictionary\`/\`OrderedDictionary\`
- When you only need **set membership** (no value) → use \`HashSet<T>\`
- For **thread safety** → \`ConcurrentDictionary<TKey, TValue>\``,
    },
    {
      id: 'l-col-2',
      title: 'Practice: Word Counts',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Given the array `string[] words = { "apple", "pear", "apple", "banana", "pear", "apple" };` use a `Dictionary<string, int>` to count occurrences, then print:\n```\napple:3\nbanana:1\npear:2\n```\n\nThe order is **alphabetical by key**.',
        starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string[] words = { "apple", "pear", "apple", "banana", "pear", "apple" };
        var counts = new Dictionary<string, int>();
        // populate counts

        // print in alphabetical order: $"{word}:{count}"

    }
}
`,
        solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string[] words = { "apple", "pear", "apple", "banana", "pear", "apple" };
        var counts = new Dictionary<string, int>();
        foreach (var w in words)
        {
            if (counts.ContainsKey(w)) counts[w]++;
            else counts[w] = 1;
        }
        foreach (var kv in counts.OrderBy(k => k.Key))
            Console.WriteLine($"{kv.Key}:{kv.Value}");
    }
}`,
        tests: [{ expectedOutput: 'apple:3\nbanana:1\npear:2', description: 'Counts sorted alphabetically' }],
        hints: [
          'Pattern: `if (dict.ContainsKey(key)) dict[key]++; else dict[key] = 1;`',
          'Use `counts.OrderBy(kv => kv.Key)` (LINQ) to walk keys alphabetically',
        ],
      },
    },
    {
      id: 'l-col-3',
      title: 'HashSet, Queue & Stack',
      type: 'theory',
      xp: 15,
      theory: `# Three more collections

## HashSet<T> — unique values

Like a Dictionary's keys without values: O(1) add / contains / remove. Drops duplicates automatically.

\`\`\`csharp
var seen = new HashSet<int>();
seen.Add(1);
seen.Add(2);
seen.Add(1);          // duplicate — Add returns false, set is still {1,2}

bool has = seen.Contains(2);     // true

// Set algebra
var a = new HashSet<int> { 1, 2, 3 };
var b = new HashSet<int> { 2, 3, 4 };
a.IntersectWith(b);              // a is now {2, 3}
a.UnionWith(b);                  // a is now {2, 3, 4}
\`\`\`

## Queue<T> — FIFO

First-in, first-out. Useful for breadth-first traversal, work queues, buffering.

\`\`\`csharp
var q = new Queue<string>();
q.Enqueue("first");
q.Enqueue("second");
q.Enqueue("third");

string s = q.Dequeue();   // "first"
string p = q.Peek();      // "second" — doesn't remove
\`\`\`

## Stack<T> — LIFO

Last-in, first-out. Depth-first traversal, undo histories, expression evaluation.

\`\`\`csharp
var st = new Stack<int>();
st.Push(1);
st.Push(2);
st.Push(3);

int top = st.Pop();       // 3
int peek = st.Peek();     // 2
\`\`\`

## When to pick which

| Need | Use |
|---|---|
| Lookup by key | \`Dictionary<TKey, TValue>\` |
| Unique items, fast contains | \`HashSet<T>\` |
| Order of insertion, indexed access | \`List<T>\` |
| FIFO processing | \`Queue<T>\` |
| LIFO processing | \`Stack<T>\` |
| Sorted by key | \`SortedDictionary<TKey, TValue>\` / \`SortedSet<T>\` |`,
    },
    {
      id: 'l-col-4',
      title: 'First Unique Character',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Given a string, return the **index** of the first character that appears only once. Return `-1` if every character is repeated.\n\nThis is a classic LeetCode problem (#387). The natural solution is a Dictionary<char, int>.',
        difficulty: 'easy',
        examples: [
          { input: '"leetcode"', output: '0', explanation: '"l" appears once and is at index 0.' },
          { input: '"loveleetcode"', output: '2', explanation: '"v" is the first character that appears once.' },
          { input: '"aabb"', output: '-1', explanation: 'Every character repeats.' },
        ],
        functionName: 'FirstUniqueChar',
        starterCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public int FirstUniqueChar(string s)
    {
        // your code here
        return -1;
    }
}`,
        solution: `using System;
using System.Collections.Generic;

public class Solution
{
    public int FirstUniqueChar(string s)
    {
        var counts = new Dictionary<char, int>();
        foreach (var c in s)
        {
            if (counts.ContainsKey(c)) counts[c]++;
            else counts[c] = 1;
        }
        for (int i = 0; i < s.Length; i++)
            if (counts[s[i]] == 1) return i;
        return -1;
    }
}`,
        testCases: [
          { input: '"leetcode"', expected: '0', description: 'leetcode → 0' },
          { input: '"loveleetcode"', expected: '2', description: 'loveleetcode → 2' },
          { input: '"aabb"', expected: '-1', description: 'all repeat → -1' },
          { input: '"z"', expected: '0', description: 'single char' },
          { input: '""', expected: '-1', description: 'empty string' },
          { input: '"abcabd"', expected: '2', description: 'c is unique at index 2' },
        ],
        hints: [
          'First pass: count each character into a Dictionary<char, int>',
          'Second pass: walk the string in order and return the first index where count == 1',
          'Two passes is O(n) — better than nested loops which would be O(n²)',
        ],
      },
    },
    {
      id: 'l-col-5',
      title: 'Collections Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the average-case time complexity of a `Dictionary<string, int>` lookup?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctIndex: 0,
          explanation: 'Dictionary uses a hash table — average O(1) for get/add/contains. Worst case is O(n) on heavy hash collisions.',
        },
        {
          question: 'Which collection is best for "process items in the order they arrived"?',
          options: ['Stack<T>', 'Queue<T>', 'HashSet<T>', 'Dictionary<int, T>'],
          correctIndex: 1,
          explanation: 'Queue is FIFO — first in, first out. Stack is LIFO. HashSet has no order at all.',
        },
        {
          question: 'What does `dict[key]` throw if the key isn\'t present?',
          options: [
            'Returns default(TValue)',
            'KeyNotFoundException',
            'NullReferenceException',
            'ArgumentException',
          ],
          correctIndex: 1,
          explanation: 'On read, missing key throws KeyNotFoundException. Use TryGetValue for safe reads. On write, missing key is auto-inserted.',
        },
        {
          question: 'You need a collection that drops duplicates and supports fast `Contains`. Best fit?',
          options: ['List<T>', 'Queue<T>', 'HashSet<T>', 'SortedSet<T>'],
          correctIndex: 2,
          explanation: 'HashSet<T> — O(1) average Add/Contains, no duplicates. SortedSet works too but is O(log n).',
        },
      ],
    },
  ],
};

const chDelegates: Chapter = {
  id: 'ch-delegates',
  title: 'Delegates & Lambdas',
  description: 'First-class functions in C#',
  icon: 'λ',
  lessons: [
    {
      id: 'l-del-1',
      title: 'Func, Action, Predicate',
      type: 'theory',
      xp: 15,
      theory: `# Delegates

A **delegate** is a typed pointer to a method — it lets you pass behavior around as data.

You don't usually declare your own delegate type anymore. The BCL ships three built-ins that cover almost every case:

| Delegate | Shape | Returns |
|---|---|---|
| \`Action\` | Up to 16 inputs | nothing (\`void\`) |
| \`Func<T1, ..., TResult>\` | Up to 16 inputs | a \`TResult\` |
| \`Predicate<T>\` | One input | \`bool\` |

\`\`\`csharp
Action sayHi = () => Console.WriteLine("hi");
Action<string> greet = name => Console.WriteLine($"Hello, {name}");
Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Predicate<int> isEven = n => n % 2 == 0;

sayHi();              // hi
greet("Alice");       // Hello, Alice
int s = square(5);    // 25
int a = add(2, 3);    // 5
bool e = isEven(4);   // true
\`\`\`

## Why this is useful

Methods that accept a delegate let the caller customize behavior:

\`\`\`csharp
static int[] Filter(int[] nums, Predicate<int> keep)
{
    var result = new List<int>();
    foreach (var n in nums)
        if (keep(n)) result.Add(n);
    return result.ToArray();
}

int[] evens = Filter(new[]{1,2,3,4,5,6}, x => x % 2 == 0);
int[] big   = Filter(new[]{1,2,3,4,5,6}, x => x > 3);
\`\`\`

This is exactly how LINQ's \`Where\` works under the hood.

## Lambdas vs methods

A **lambda** is a tiny inline function:

\`\`\`csharp
Func<int, int> f = x => x * x;        // expression lambda
Func<int, int> g = x => { return x * x; };  // statement lambda (with body)
\`\`\`

You can also assign a regular method to a delegate variable:

\`\`\`csharp
static int Square(int x) => x * x;

Func<int, int> f = Square;            // method group conversion
int n = f(7);                          // 49
\`\`\``,
    },
    {
      id: 'l-del-2',
      title: 'Practice: Apply a Func',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'A `static int[] Map(int[] nums, Func<int, int> f)` method is given. Use it to **double** every element of `{1, 2, 3, 4}` and print each on its own line.\n\nExpected output:\n```\n2\n4\n6\n8\n```',
        starterCode: `using System;

class Program
{
    static int[] Map(int[] nums, Func<int, int> f)
    {
        var result = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) result[i] = f(nums[i]);
        return result;
    }

    static void Main()
    {
        int[] input = { 1, 2, 3, 4 };
        // Use Map with a lambda that doubles its arg

    }
}
`,
        solution: `using System;

class Program
{
    static int[] Map(int[] nums, Func<int, int> f)
    {
        var result = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) result[i] = f(nums[i]);
        return result;
    }

    static void Main()
    {
        int[] input = { 1, 2, 3, 4 };
        int[] doubled = Map(input, x => x * 2);
        foreach (var n in doubled) Console.WriteLine(n);
    }
}`,
        tests: [{ expectedOutput: '2\n4\n6\n8', description: 'Each element doubled' }],
        hints: [
          'The lambda is `x => x * 2`',
          'foreach over the result and Console.WriteLine each value',
        ],
      },
    },
    {
      id: 'l-del-3',
      title: 'Lambdas & Closures',
      type: 'theory',
      xp: 15,
      theory: `# Closures

A lambda **captures** variables from its enclosing scope:

\`\`\`csharp
int multiplier = 3;
Func<int, int> times = x => x * multiplier;

Console.WriteLine(times(5));   // 15

multiplier = 10;
Console.WriteLine(times(5));   // 50  -- captured by reference!
\`\`\`

The lambda doesn't snapshot \`multiplier\`'s value at creation time — it captures the **variable**. When you call the lambda later, it reads whatever value that variable has now.

## The classic loop gotcha

\`\`\`csharp
var actions = new List<Action>();
for (int i = 0; i < 3; i++)
    actions.Add(() => Console.WriteLine(i));

foreach (var a in actions) a();
// Modern C# (>=5): prints 0, 1, 2 — each iteration captures its own i
// Old C# (<=4):    prints 3, 3, 3 — all share the same i
\`\`\`

Modern C# made the for-loop variable per-iteration to fix this. \`foreach\` always was per-iteration.

## Capturing readonly vs mutable

\`\`\`csharp
int counter = 0;
Action tick = () => counter++;
tick(); tick(); tick();
Console.WriteLine(counter);   // 3
\`\`\`

The lambda mutates the captured variable. This is real shared state — be careful with it across threads.

## Anatomy

A statement-bodied lambda can have multiple lines:

\`\`\`csharp
Func<int, int, int> compute = (a, b) =>
{
    int sum = a + b;
    int sq  = sum * sum;
    return sq;
};
\`\`\``,
    },
    {
      id: 'l-del-4',
      title: 'Events',
      type: 'theory',
      xp: 15,
      theory: `# Events

An **event** is a delegate field with a guardrail: only the declaring class can *raise* it; outsiders can only *subscribe* and *unsubscribe*.

\`\`\`csharp
class Button
{
    // EventHandler is shorthand for: Action<object, EventArgs>
    public event EventHandler? Click;

    public void Press()
    {
        // Raise the event - notify all subscribers
        Click?.Invoke(this, EventArgs.Empty);
    }
}

var btn = new Button();
btn.Click += (sender, e) => Console.WriteLine("clicked!");
btn.Press();   // prints "clicked!"
\`\`\`

## += / -=

\`\`\`csharp
EventHandler handler = (s, e) => Console.WriteLine("hi");
btn.Click += handler;        // subscribe
btn.Press();                 // hi
btn.Click -= handler;        // unsubscribe (use the SAME reference)
btn.Press();                 // (nothing)
\`\`\`

The unsubscribe gotcha: \`-=\` only works if you have the same delegate instance you subscribed with. Lambdas are anonymous, so you usually need to hold the reference if you want to unsubscribe.

## Custom event args

When the event needs to carry data, define a payload type:

\`\`\`csharp
class TemperatureChangedArgs : EventArgs
{
    public double NewTemp { get; init; }
}

class Sensor
{
    public event EventHandler<TemperatureChangedArgs>? TemperatureChanged;

    public void Update(double t)
        => TemperatureChanged?.Invoke(this, new TemperatureChangedArgs { NewTemp = t });
}
\`\`\`

## When to use events vs callbacks

- One source, many listeners, optional → **event**
- One source, one mandatory listener → **delegate parameter** (callback)
- Cross-cutting messaging across the app → **mediator / message bus** (later)`,
    },
    {
      id: 'l-del-5',
      title: 'Delegates & Events Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which built-in delegate represents a function that takes nothing and returns nothing?',
          options: ['Func', 'Action', 'Predicate', 'EventHandler'],
          correctIndex: 1,
          explanation: '`Action` is parameterless and returns void. `Action<T>` adds parameters; `Func` always returns a value.',
        },
        {
          question: 'What does a lambda capture for variables in its enclosing scope?',
          options: [
            'A snapshot of the value at creation time',
            'A reference to the variable — sees later changes',
            'Nothing — lambdas can\'t access outer variables',
            'A deep copy of the entire scope',
          ],
          correctIndex: 1,
          explanation: 'Lambdas capture variables by reference, not value. If the outer variable changes, the lambda sees the new value.',
        },
        {
          question: 'Why does `event` exist when a public delegate field would also work?',
          options: [
            'Performance',
            'It prevents external code from raising or replacing the delegate; only += and -= are allowed',
            'Required by the runtime',
            'It is just a naming convention',
          ],
          correctIndex: 1,
          explanation: 'event encapsulates the delegate so subscribers can only subscribe/unsubscribe. Outside code can\'t invoke or assign null to the underlying delegate.',
        },
        {
          question: 'What is `Predicate<T>` equivalent to?',
          options: ['Func<T>', 'Func<T, bool>', 'Action<T>', 'Func<bool, T>'],
          correctIndex: 1,
          explanation: 'A Predicate<T> takes one T and returns a bool — same shape as Func<T, bool>.',
        },
      ],
    },
  ],
};

const chAdvLinq: Chapter = {
  id: 'ch-adv-linq',
  title: 'Advanced LINQ',
  description: 'Grouping, joining, and the lazy pipeline',
  icon: '🧠',
  lessons: [
    {
      id: 'l-alq-1',
      title: 'GroupBy & ToLookup',
      type: 'theory',
      xp: 15,
      theory: `# GroupBy

\`GroupBy\` partitions a sequence into groups by a key. Each group is itself an enumerable.

\`\`\`csharp
var people = new[]
{
    new { Name = "Alice",  Dept = "Eng"  },
    new { Name = "Bob",    Dept = "Sales"},
    new { Name = "Carol",  Dept = "Eng"  },
    new { Name = "Dave",   Dept = "Sales"},
    new { Name = "Eve",    Dept = "HR"   }
};

var byDept = people.GroupBy(p => p.Dept);

foreach (var g in byDept)
{
    Console.WriteLine($"{g.Key}: {g.Count()}");
    foreach (var p in g) Console.WriteLine($"  {p.Name}");
}
// Eng: 2
//   Alice
//   Carol
// Sales: 2
//   Bob
//   Dave
// HR: 1
//   Eve
\`\`\`

The result is \`IEnumerable<IGrouping<TKey, TElement>>\` — \`IGrouping\` is just an enumerable plus a \`Key\`.

## GroupBy + project

Often you want to summarize per group:

\`\`\`csharp
var counts = people
    .GroupBy(p => p.Dept)
    .Select(g => new { Dept = g.Key, Count = g.Count() })
    .OrderByDescending(x => x.Count);
\`\`\`

## ToLookup — eagerly indexed

\`ToLookup\` is like GroupBy but it executes immediately and gives you a Dictionary-like \`ILookup<TKey, TElement>\`:

\`\`\`csharp
var lookup = people.ToLookup(p => p.Dept);
foreach (var p in lookup["Eng"]) Console.WriteLine(p.Name);
// Alice, Carol
\`\`\`

Use ToLookup when you need to query the same groups multiple times.`,
    },
    {
      id: 'l-alq-2',
      title: 'Practice: Group & Count',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Given the array `int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };` group by even/odd and print each group\'s count, in this order:\n\nExpected output:\n```\nodd:5\neven:5\n```',
        starterCode: `using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        // GroupBy even/odd, project to {Key, Count}, print

    }
}
`,
        solution: `using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var groups = nums.GroupBy(n => n % 2 == 0 ? "even" : "odd");
        foreach (var g in groups)
            Console.WriteLine($"{g.Key}:{g.Count()}");
    }
}`,
        tests: [{ expectedOutput: 'odd:5\neven:5', description: 'Odd group first (LINQ keeps source order)' }],
        hints: [
          'GroupBy(n => n % 2 == 0 ? "even" : "odd") returns groups keyed by "even" / "odd"',
          'GroupBy preserves the order each key first appears in the source — 1 is odd so "odd" comes first',
          'Use g.Count() inside the foreach',
        ],
      },
    },
    {
      id: 'l-alq-3',
      title: 'Aggregate, Join & Deferred Execution',
      type: 'theory',
      xp: 15,
      theory: `# Aggregate, Join, deferred execution

## Aggregate — fold the sequence into one value

\`\`\`csharp
int[] nums = { 1, 2, 3, 4, 5 };

int sum = nums.Aggregate((acc, n) => acc + n);            // 15
int product = nums.Aggregate(1, (acc, n) => acc * n);      // 120  (with seed 1)
string csv = nums.Aggregate("", (acc, n) => acc + n + ","); // "1,2,3,4,5,"
\`\`\`

\`Sum\`, \`Min\`, \`Max\`, \`Average\` are all specialized aggregates.

## Join — SQL-style joins

\`\`\`csharp
var orders = new[] { new { Id = 1, CustomerId = 10 }, new { Id = 2, CustomerId = 20 } };
var customers = new[] { new { Id = 10, Name = "Alice" }, new { Id = 20, Name = "Bob" } };

var rows = orders.Join(
    customers,
    o => o.CustomerId,        // outer key
    c => c.Id,                // inner key
    (o, c) => new { OrderId = o.Id, Customer = c.Name }
);
// { OrderId=1, Customer="Alice" }, { OrderId=2, Customer="Bob" }
\`\`\`

## Deferred execution

LINQ is **lazy**. \`Where\`, \`Select\`, \`OrderBy\`, etc. don't run when you call them — they build a **pipeline**. Execution happens when you iterate (foreach, ToArray, ToList, Count, First, ...).

\`\`\`csharp
var pipeline = nums.Where(n => { Console.Write("."); return n > 2; });
Console.WriteLine("built");

foreach (var n in pipeline) { /* ... */ }
// Output: built.....
//          ^^built printed first - the dots happen when we iterate
\`\`\`

This means:
- You can build queries cheaply
- The sequence may be re-evaluated each time you iterate
- Side-effects in lambdas are dangerous

To **freeze** results, materialize with \`.ToList()\` or \`.ToArray()\`.

## When NOT to use LINQ

- Hot inner loops where allocations matter — write the loop yourself
- Complex multi-pass logic that becomes harder to read in fluent form
- When debugging is hard (a 6-step LINQ chain is opaque in the debugger)`,
    },
    {
      id: 'l-alq-4',
      title: 'Word Frequency Top-N',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Given a space-separated string of words, return the top **k** most-frequent words sorted by frequency **descending**, breaking ties alphabetically (ascending).\n\nReturn the result as a string array. If k is larger than the number of distinct words, return all of them.\n\nThe input string is non-empty and contains only lowercase letters and single spaces.',
        difficulty: 'medium',
        examples: [
          { input: '"the cat sat on the mat", 2', output: '["the", "cat"]', explanation: '"the" appears twice; cat/sat/on/mat each once. Tie broken alphabetically — "cat" < "mat" < "on" < "sat".' },
          { input: '"a b c", 5', output: '["a", "b", "c"]', explanation: 'Only 3 distinct, return all sorted.' },
          { input: '"x x x y y z", 1', output: '["x"]' },
        ],
        functionName: 'TopWords',
        starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

public class Solution
{
    public string[] TopWords(string text, int k)
    {
        // your code here
        return new string[0];
    }
}`,
        solution: `using System;
using System.Linq;
using System.Collections.Generic;

public class Solution
{
    public string[] TopWords(string text, int k)
    {
        return text.Split(' ', StringSplitOptions.RemoveEmptyEntries)
            .GroupBy(w => w)
            .OrderByDescending(g => g.Count())
            .ThenBy(g => g.Key)
            .Take(k)
            .Select(g => g.Key)
            .ToArray();
    }
}`,
        testCases: [
          { input: '"the cat sat on the mat", 2', expected: '["the", "cat"]', description: 'Tie broken alphabetically' },
          { input: '"a b c", 5', expected: '["a", "b", "c"]', description: 'k larger than distinct count' },
          { input: '"x x x y y z", 1', expected: '["x"]', description: 'Top-1' },
          { input: '"banana apple apple cherry banana banana", 2', expected: '["banana", "apple"]', description: 'Clear ranking' },
          { input: '"red blue green", 3', expected: '["blue", "green", "red"]', description: 'All tied → all alphabetical' },
        ],
        hints: [
          'Use Split(\' \', StringSplitOptions.RemoveEmptyEntries)',
          'Chain: GroupBy(w => w).OrderByDescending(g => g.Count()).ThenBy(g => g.Key)',
          'Take(k).Select(g => g.Key).ToArray() to finish',
        ],
      },
    },
    {
      id: 'l-alq-5',
      title: 'Advanced LINQ Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: '`Aggregate` with a seed of 1 and `(a, n) => a * n` over `{1, 2, 3, 4}` produces what?',
          options: ['10', '24', '15', '0'],
          correctIndex: 1,
          explanation: 'It computes the product: 1 × 1 × 2 × 3 × 4 = 24.',
        },
        {
          question: 'Which method **forces** a LINQ pipeline to execute?',
          options: ['Where', 'Select', 'OrderBy', 'ToList'],
          correctIndex: 3,
          explanation: 'Where/Select/OrderBy build the pipeline lazily. ToList, ToArray, Count, First, etc. trigger execution.',
        },
        {
          question: 'What does GroupBy preserve in its output?',
          options: [
            'Insertion order of distinct keys (the order each key first appears)',
            'Alphabetical key order',
            'Random order',
            'Reverse insertion order',
          ],
          correctIndex: 0,
          explanation: 'Groups appear in the order their key was first seen in the source. Use OrderBy(g => g.Key) to sort alphabetically.',
        },
        {
          question: 'What happens if you iterate the same `Where(...)` query twice?',
          options: [
            'The second iteration is cached',
            'It re-evaluates every iteration — predicate runs again',
            'It throws',
            'Only the first iteration works',
          ],
          correctIndex: 1,
          explanation: 'LINQ queries are lazy and re-execute on each iteration. Materialize with ToList()/ToArray() if you want to freeze the result.',
        },
      ],
    },
  ],
};

// __END_CHAPTERS__

export const csharpCourse: Course = {
  id: 'csharp',
  title: 'C# / .NET',
  icon: '⚙️',
  chapters: [
    ch1Basics,
    chCli,
    ch2Variables,
    chCasting,
    ch3Operators,
    ch4Conditionals,
    ch5Loops,
    ch6Methods,
    chMethodParams,
    chConsoleIO,
    ch7Collections,
    chCollections,
    ch8Strings,
    chStringsAdv,
    ch9OopBasics,
    chAccess,
    chEnums,
    ch10Inheritance,
    chGenerics,
    chDelegates,
    ch11Linq,
    chAdvLinq,
    ch12Exceptions,
    ch13Milestone,
  ],
};

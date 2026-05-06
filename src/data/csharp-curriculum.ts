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

// __END_CHAPTERS__

export const csharpCourse: Course = {
  id: 'csharp',
  title: 'C# / .NET',
  icon: '⚙️',
  chapters: [
    ch1Basics,
    ch2Variables,
    ch3Operators,
    ch4Conditionals,
    ch5Loops,
    ch6Methods,
    ch7Collections,
    ch8Strings,
    ch9OopBasics,
    ch10Inheritance,
    ch11Linq,
    ch12Exceptions,
    ch13Milestone,
  ],
};

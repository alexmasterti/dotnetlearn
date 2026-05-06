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
    {
      id: 'l-ch1-greet',
      title: 'Challenge: Greet',
      type: 'challenge',
      xp: 35,
      challenge: {
        description: 'Return the greeting `"Hello, <name>!"` (note the comma, space, and exclamation mark) for any name.\n\nIf the name is empty, return `"Hello, friend!"`.',
        difficulty: 'easy',
        examples: [
          { input: '"Alex"', output: '"Hello, Alex!"' },
          { input: '"World"', output: '"Hello, World!"' },
          { input: '""', output: '"Hello, friend!"', explanation: 'Empty name → fallback to friend' },
        ],
        functionName: 'Greet',
        starterCode: `using System;

public class Solution
{
    public string Greet(string name)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;

public class Solution
{
    public string Greet(string name)
    {
        if (string.IsNullOrEmpty(name)) return "Hello, friend!";
        return "Hello, " + name + "!";
    }
}`,
        testCases: [
          { input: '"Alex"', expected: '"Hello, Alex!"', description: 'Standard name' },
          { input: '"World"', expected: '"Hello, World!"', description: 'Another name' },
          { input: '""', expected: '"Hello, friend!"', description: 'Empty fallback' },
          { input: '"Maria"', expected: '"Hello, Maria!"', description: 'Different name' },
        ],
        hints: [
          'Check for empty first: `if (string.IsNullOrEmpty(name)) return "Hello, friend!";`',
          'Otherwise concatenate or interpolate: `$"Hello, {name}!"`',
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
    {
      id: 'l-ch3-pow2',
      title: 'Challenge: Power of Two',
      type: 'challenge',
      xp: 40,
      challenge: {
        description: 'Return `true` if `n` is a positive power of two (1, 2, 4, 8, 16, …), `false` otherwise.\n\n**Bonus**: do it without a loop. There\'s a one-line bitwise trick that turns this into `O(1)`.',
        difficulty: 'easy',
        examples: [
          { input: '1', output: 'True', explanation: '1 = 2^0' },
          { input: '8', output: 'True', explanation: '8 = 2^3' },
          { input: '6', output: 'False' },
          { input: '0', output: 'False', explanation: '0 is not a power of 2' },
          { input: '-4', output: 'False' },
        ],
        functionName: 'IsPowerOfTwo',
        starterCode: `using System;

public class Solution
{
    public bool IsPowerOfTwo(int n)
    {
        // your code here
        return false;
    }
}`,
        solution: `using System;

public class Solution
{
    public bool IsPowerOfTwo(int n)
    {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
        testCases: [
          { input: '1', expected: 'True', description: '2^0' },
          { input: '2', expected: 'True', description: '2^1' },
          { input: '8', expected: 'True', description: '2^3' },
          { input: '1024', expected: 'True', description: '2^10' },
          { input: '6', expected: 'False', description: 'Non-power' },
          { input: '0', expected: 'False', description: 'Zero' },
          { input: '-4', expected: 'False', description: 'Negative' },
          { input: '3', expected: 'False', description: 'Not 2-power' },
        ],
        hints: [
          'A power of 2 has exactly one bit set in binary (1=0001, 2=0010, 4=0100, 8=1000)',
          'Trick: `n & (n - 1)` clears the lowest set bit. If the result is 0, n had only one bit set.',
          'Don\'t forget: n must be positive. `n > 0 && (n & (n-1)) == 0`',
        ],
      },
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
      id: 'l-am-2-fs',
      title: 'Practice: file-scoped namespace',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Use a **file-scoped namespace** (`namespace Foo;`) to declare a class `Greeter` in namespace `MyApp` with one static method `Hi()` that returns `"hi from MyApp"`. `Main()` calls it.\n\nExpected output:\n```\nhi from MyApp\n```',
        starterCode: `using System;

// Add a file-scoped namespace MyApp; and define class Greeter below.

class Program
{
    static void Main()
    {
        Console.WriteLine(MyApp.Greeter.Hi());
    }
}
`,
        solution: `using System;

namespace MyApp;

public class Greeter
{
    public static string Hi() => "hi from MyApp";
}

class Program
{
    static void Main()
    {
        Console.WriteLine(MyApp.Greeter.Hi());
    }
}`,
        tests: [{ expectedOutput: 'hi from MyApp', description: 'File-scoped namespace + static method' }],
        hints: [
          '`namespace MyApp;` ends with a semicolon and applies to the rest of the file',
          'Greeter goes inside MyApp; Program stays outside (no namespace) so Main is the entry',
          'Or: keep both inside MyApp and let the runtime find Main — both work',
        ],
      },
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

const chNRT: Chapter = {
  id: 'ch-nrt',
  title: 'Null Safety',
  description: 'Nullable references, ?. and ??',
  icon: '🚫',
  lessons: [
    {
      id: 'l-nrt-1',
      title: 'Null is the billion-dollar mistake',
      type: 'theory',
      xp: 15,
      theory: `# Nullable Reference Types

The most common runtime error in any .NET app is \`NullReferenceException\` — accessing a member on a \`null\` reference. Modern C# has built-in tools to push detection to **compile time**.

## The annotation

In a project with \`<Nullable>enable</Nullable>\` (default for new templates), every reference type defaults to **non-nullable**:

\`\`\`csharp
string name = null;     // warning: cannot assign null to non-nullable
string? maybe = null;   // OK — explicit ?
\`\`\`

The \`?\` is **just a hint to the compiler** — it doesn't change runtime behavior. Both \`string\` and \`string?\` are the same type at runtime.

## ?. — null-conditional access

\`\`\`csharp
string? s = GetName();
int? len = s?.Length;          // null if s is null, else s.Length
\`\`\`

Cascade safely:

\`\`\`csharp
int? floor = building?.Address?.Floor;
\`\`\`

## ?? — null-coalescing

\`\`\`csharp
string name = maybe ?? "anonymous";   // use "anonymous" if maybe is null
\`\`\`

Combine with \`?.\`:

\`\`\`csharp
int len = s?.Length ?? 0;
\`\`\`

## ??= — assign-if-null

\`\`\`csharp
_cache ??= LoadCache();   // assign only if currently null
\`\`\`

Equivalent to \`if (_cache == null) _cache = LoadCache();\` but one line.

## ! — null-forgiving operator

When the compiler complains about null but you *know* it's not:

\`\`\`csharp
string MustBeSet = config["AppName"]!;   // I promise it's there
\`\`\`

Use sparingly — you're telling the compiler to trust you. If you're wrong, you get a runtime NRE.`,
    },
    {
      id: 'l-nrt-2',
      title: 'Practice: Safe Defaults',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Given a `string?` named `input` (set to `null` for testing), use the null-coalescing operator `??` to print `"(none)"` when input is null, otherwise print input.\n\nExpected output:\n```\n(none)\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        string? input = null;
        // Print input ?? "(none)"

    }
}
`,
        solution: `using System;

class Program
{
    static void Main()
    {
        string? input = null;
        Console.WriteLine(input ?? "(none)");
    }
}`,
        tests: [{ expectedOutput: '(none)', description: 'Null falls back to "(none)"' }],
        hints: [
          'The null-coalescing operator is `??`',
          '`input ?? "(none)"` returns input when it\'s non-null, otherwise the right side',
        ],
      },
    },
    {
      id: 'l-nrt-3',
      title: 'Null Safety Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does `s?.Length` return if `s` is null?',
          options: ['0', 'null', 'NullReferenceException', '-1'],
          correctIndex: 1,
          explanation: 'The null-conditional operator short-circuits: if s is null, the whole expression is null (and the type becomes int? rather than int).',
        },
        {
          question: 'Which operator means "assign only if currently null"?',
          options: ['??', '?.', '??=', '!?'],
          correctIndex: 2,
          explanation: '`??=` is the null-coalescing assignment. Useful for lazy initialization.',
        },
        {
          question: 'Does `string?` produce different IL/runtime than `string`?',
          options: [
            'Yes, completely different types',
            'No — same runtime type; the `?` is a compile-time annotation',
            'Yes, `string?` is a generic',
            'Only on .NET Framework',
          ],
          correctIndex: 1,
          explanation: 'NRT is purely a compile-time feature. At runtime they\'re the same type. The annotations help the compiler warn about probable nulls.',
        },
        {
          question: 'When should you use the `!` null-forgiving operator?',
          options: [
            'Anywhere the compiler complains',
            'Only when you have proof the value isn\'t null and the compiler can\'t see it',
            'Always — it\'s faster',
            'Never',
          ],
          correctIndex: 1,
          explanation: '`!` says "trust me, it\'s not null." Misuse causes runtime NREs. Use sparingly and document why you know.',
        },
      ],
    },
  ],
};

const chValueRef: Chapter = {
  id: 'ch-value-ref',
  title: 'Value vs Reference Types',
  description: 'Stack, heap, and the boxing trap',
  icon: '⚖️',
  lessons: [
    {
      id: 'l-vr-1',
      title: 'Two kinds of types',
      type: 'theory',
      xp: 15,
      theory: `# Value types vs Reference types

Every C# type is either a **value type** or a **reference type**. The difference shows up in how variables hold them and how they're passed around.

## Value types

Stored **inline** — the variable IS the value. Copy on assignment.

Examples: \`int\`, \`double\`, \`bool\`, \`char\`, \`enum\`, all \`struct\`s.

\`\`\`csharp
int a = 5;
int b = a;     // b is a copy
b = 99;
Console.WriteLine(a);  // still 5
\`\`\`

## Reference types

Stored **by reference** — the variable holds a pointer to an object on the **heap**.

Examples: \`class\`, \`string\`, arrays, delegates, interfaces.

\`\`\`csharp
class Box { public int Value; }

var x = new Box { Value = 5 };
var y = x;       // y points to the SAME box
y.Value = 99;
Console.WriteLine(x.Value);  // 99 — same object
\`\`\`

## Equality

\`==\` for value types compares values; for reference types it compares **identity** (are these the same object?). \`string\` is a famous exception: it overrides \`==\` to compare contents.

\`\`\`csharp
new Box { Value = 5 } == new Box { Value = 5 };  // false: different objects
"abc" == "abc";                                   // true: string overrides ==
5 == 5;                                           // true: value comparison
\`\`\`

Use \`Equals\` or override it for content equality on classes.

## Stack vs heap (rule of thumb)

- Local **value-type variables** → stack
- All **objects** (reference types) → heap
- Value types **inside** an object → live on the heap with the object
- The rule isn't really about value vs reference — it's about *where the variable lives* — but "value = stack" is a useful default.`,
    },
    {
      id: 'l-vr-2',
      title: 'Boxing & Unboxing',
      type: 'theory',
      xp: 15,
      theory: `# Boxing

When a value type is stored as \`object\` (or an interface), the runtime **boxes** it: allocates a wrapper on the heap, copies the value in, and stores a reference.

\`\`\`csharp
int n = 42;
object boxed = n;        // BOXING — allocates on heap
int back = (int)boxed;    // UNBOXING — copies back to a value-type variable
\`\`\`

## Why care?

- **Allocation**: every box is a heap allocation, plus eventual GC work
- **Indirection**: accessing the value goes through a pointer
- Hot loops doing implicit boxing can hurt performance significantly

## Where boxing hides

\`\`\`csharp
ArrayList list = new ArrayList();
list.Add(1);                // boxed (ArrayList stores object)

object obj = 5;             // boxed
string s = "x = " + 5;      // 5 is boxed for ToString via object

void Log(object msg) { ... }
Log(42);                    // boxed
\`\`\`

## How generics avoid it

\`\`\`csharp
var list = new List<int>();
list.Add(1);                // NO boxing — list stores int directly
\`\`\`

This is one of the main wins of generics: no boxing for value types.

## struct design rule

\`struct\` is a value type. Default it to **immutable + small** (≤ 16 bytes is a common rule of thumb). Mutable structs have a famous footgun:

\`\`\`csharp
struct Point { public int X, Y; }

var arr = new Point[1];
arr[0].X = 5;     // works: indexer returns ref to the struct in the array

var list = new List<Point>();
list.Add(new Point());
// list[0].X = 5; // COMPILE ERROR: list[0] returns a COPY, can't modify
\`\`\`

When in doubt: **classes for behavior, structs for tiny value-like data** (Point, Date, Money).`,
    },
    {
      id: 'l-vr-code',
      title: 'Practice: struct vs class semantics',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'A `struct Point` and a `class Box` are defined. Each starts with X=1. The program then assigns each into a new variable, mutates X to 99 on the copy, and prints the original\'s X.\n\nFill in the prints so the output shows that struct copies are independent (Point original stays 1) but class references share state (Box original becomes 99).\n\nExpected output:\n```\nPoint original X: 1\nBox original X: 99\n```',
        starterCode: `using System;

struct Point { public int X; }
class Box     { public int X; }

class Program
{
    static void Main()
    {
        var p1 = new Point { X = 1 };
        var p2 = p1;
        p2.X = 99;
        // Print "Point original X: " followed by p1.X

        var b1 = new Box   { X = 1 };
        var b2 = b1;
        b2.X = 99;
        // Print "Box original X: " followed by b1.X
    }
}
`,
        solution: `using System;

struct Point { public int X; }
class Box     { public int X; }

class Program
{
    static void Main()
    {
        var p1 = new Point { X = 1 };
        var p2 = p1;
        p2.X = 99;
        Console.WriteLine("Point original X: " + p1.X);

        var b1 = new Box   { X = 1 };
        var b2 = b1;
        b2.X = 99;
        Console.WriteLine("Box original X: " + b1.X);
    }
}`,
        tests: [{ expectedOutput: 'Point original X: 1\nBox original X: 99', description: 'struct copies, class shares' }],
        hints: [
          'After `p2 = p1`, p1 and p2 are separate Points. Mutating p2 does not change p1.',
          'After `b2 = b1`, b1 and b2 are two references to the same Box. Mutating b2.X mutates b1.X.',
          'Just `Console.WriteLine("...: " + p1.X);` and similar for b1',
        ],
      },
    },
    {
      id: 'l-vr-3',
      title: 'Value vs Reference Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'After `int b = a;`, modifying `b` does what to `a`?',
          options: [
            'Both change — they share storage',
            'a is unchanged — int is a value type, b is a copy',
            'a becomes 0',
            'Compiler error',
          ],
          correctIndex: 1,
          explanation: 'Value types are copied on assignment. b has its own storage; changing b doesn\'t affect a.',
        },
        {
          question: 'What is "boxing"?',
          options: [
            'Wrapping code in a try/catch',
            'Converting a value type to object (allocates a heap wrapper)',
            'Marking a class as sealed',
            'Compiling AOT',
          ],
          correctIndex: 1,
          explanation: 'Boxing wraps a value type in an object on the heap. Common when storing primitives in `object` collections or via interfaces.',
        },
        {
          question: 'Why do generics like `List<int>` outperform `ArrayList` for value types?',
          options: [
            'Generics are AOT-compiled',
            'They store the values directly without boxing',
            'They use less code',
            'They\'re not faster',
          ],
          correctIndex: 1,
          explanation: 'List<int> stores ints inline. ArrayList stores objects, forcing every int to be boxed. Boxing means heap allocation + indirection.',
        },
        {
          question: 'Which is a value type?',
          options: ['string', 'int[]', 'DateTime', 'List<T>'],
          correctIndex: 2,
          explanation: 'DateTime is a struct = value type. Strings, arrays, and List<T> are reference types.',
        },
      ],
    },
  ],
};

const chDisposable: Chapter = {
  id: 'ch-disposable',
  title: 'IDisposable & using',
  description: 'Deterministic cleanup of resources',
  icon: '🧹',
  lessons: [
    {
      id: 'l-disp-1',
      title: 'Why IDisposable?',
      type: 'theory',
      xp: 15,
      theory: `# IDisposable

The garbage collector handles **memory**, but it can't handle other kinds of resources:

- Open files / sockets / pipes
- Database connections
- Locked OS handles
- Timers
- Native (P/Invoke) memory

For these, you need **deterministic cleanup**. Enter \`IDisposable\`:

\`\`\`csharp
public interface IDisposable
{
    void Dispose();
}
\`\`\`

A class that owns one of those resources implements \`IDisposable\` and frees it in \`Dispose()\`.

## using — the safe consumer pattern

\`\`\`csharp
using (var reader = new StreamReader("data.txt"))
{
    string line = reader.ReadLine();
    // ...
}   // reader.Dispose() called automatically here, even on exception
\`\`\`

\`using\` desugars to a \`try / finally\` that calls \`Dispose\` no matter how the block exits.

## using declaration (C# 8+)

If you want the cleanup at the end of the enclosing block (no extra braces):

\`\`\`csharp
using var reader = new StreamReader("data.txt");
string line = reader.ReadLine();
// reader.Dispose() called when method exits
\`\`\`

## Implementing IDisposable

Most classes don't need to. Implement it only when **your class directly owns** one of those special resources:

\`\`\`csharp
class TempFile : IDisposable
{
    private readonly string _path;
    private bool _disposed;

    public TempFile(string content)
    {
        _path = Path.GetTempFileName();
        File.WriteAllText(_path, content);
    }

    public void Dispose()
    {
        if (_disposed) return;
        File.Delete(_path);
        _disposed = true;
        GC.SuppressFinalize(this);
    }
}
\`\`\`

The "called twice" guard (\`_disposed\`) is important — Dispose must be **idempotent**.`,
    },
    {
      id: 'l-disp-2',
      title: 'Practice: Disposable Logger',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Implement a class `Section` that implements `IDisposable`. The constructor takes a name and prints `"open: name"`. `Dispose` prints `"close: name"`.\n\n`Main()` already creates one inside a `using` block. Expected output:\n```\nopen: phase1\ndoing work\nclose: phase1\n```',
        starterCode: `using System;

class Program
{
    static void Main()
    {
        using (var s = new Section("phase1"))
        {
            Console.WriteLine("doing work");
        }
    }
}

// Implement Section : IDisposable below

`,
        solution: `using System;

class Program
{
    static void Main()
    {
        using (var s = new Section("phase1"))
        {
            Console.WriteLine("doing work");
        }
    }
}

class Section : IDisposable
{
    private readonly string _name;
    public Section(string name)
    {
        _name = name;
        Console.WriteLine("open: " + _name);
    }
    public void Dispose()
    {
        Console.WriteLine("close: " + _name);
    }
}`,
        tests: [{ expectedOutput: 'open: phase1\ndoing work\nclose: phase1', description: 'Open / work / close' }],
        hints: [
          'class Section : IDisposable',
          'Constructor prints "open: " + name',
          'Dispose() prints "close: " + name',
        ],
      },
    },
    {
      id: 'l-disp-using-var',
      title: 'Practice: using var declaration',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'C# 8 introduced **using var** declarations: instead of wrapping code in `using (var x = ...) { ... }` blocks, you can write `using var x = ...;` and the variable is disposed when its enclosing scope ends.\n\nRewrite the program below to use the declaration form (no `{ ... }` block). Expected output is unchanged.\n\nExpected output:\n```\nopen: build\nstep 1\nstep 2\nclose: build\n```',
        starterCode: `using System;

class Section : IDisposable
{
    private readonly string _name;
    public Section(string name) { _name = name; Console.WriteLine("open: " + _name); }
    public void Dispose() { Console.WriteLine("close: " + _name); }
}

class Program
{
    static void Main()
    {
        // Rewrite this as: using var s = new Section("build");  (no parens, no extra braces)
        using (var s = new Section("build"))
        {
            Console.WriteLine("step 1");
            Console.WriteLine("step 2");
        }
    }
}
`,
        solution: `using System;

class Section : IDisposable
{
    private readonly string _name;
    public Section(string name) { _name = name; Console.WriteLine("open: " + _name); }
    public void Dispose() { Console.WriteLine("close: " + _name); }
}

class Program
{
    static void Main()
    {
        using var s = new Section("build");
        Console.WriteLine("step 1");
        Console.WriteLine("step 2");
    }
}`,
        tests: [{ expectedOutput: 'open: build\nstep 1\nstep 2\nclose: build', description: 'using-var disposes at end of method scope' }],
        hints: [
          'Drop the parens and braces: `using var s = new Section("build");`',
          'The variable lives until the end of the enclosing block (here, Main)',
          'Multiple disposables can stack: `using var a = ...; using var b = ...;` — disposed in reverse order',
        ],
      },
    },
    {
      id: 'l-disp-3',
      title: 'IDisposable Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does `Dispose()` get called in a `using (var x = ...)` block?',
          options: [
            'Only on normal exit',
            'When `x` goes out of scope at GC time',
            'When the using block ends — both normal and exception paths',
            'You have to call it manually',
          ],
          correctIndex: 2,
          explanation: 'The compiler emits a try/finally so Dispose runs on both clean exit and exceptions. That guarantee is the whole point.',
        },
        {
          question: 'Should every class implement IDisposable?',
          options: [
            'Yes, just to be safe',
            'Only when the class directly owns unmanaged or special resources',
            'Only static classes',
            'Never — the GC handles everything',
          ],
          correctIndex: 1,
          explanation: 'Most classes only own memory, which the GC handles fine. Implement IDisposable when you own files, sockets, native handles, etc.',
        },
        {
          question: 'What\'s the convention for calling Dispose multiple times?',
          options: [
            'It throws InvalidOperationException',
            'It must be idempotent — safe to call repeatedly',
            'Only the first call works, the rest do nothing automatically',
            'It allocates new resources',
          ],
          correctIndex: 1,
          explanation: 'Dispose should be safe to call any number of times. Use a `_disposed` flag to short-circuit subsequent calls.',
        },
      ],
    },
  ],
};

const chFileIO: Chapter = {
  id: 'ch-file-io',
  title: 'File I/O & Streams',
  description: 'Read, write, and stream data',
  icon: '📂',
  lessons: [
    {
      id: 'l-io-1',
      title: 'The File class',
      type: 'theory',
      xp: 15,
      theory: `# File I/O

\`System.IO.File\` ships static helpers for the common cases. They handle opening, reading, and closing the file for you.

## Read a whole file

\`\`\`csharp
string text = File.ReadAllText("notes.txt");
string[] lines = File.ReadAllLines("notes.txt");
byte[] bytes = File.ReadAllBytes("image.png");
\`\`\`

## Write a whole file

\`\`\`csharp
File.WriteAllText("out.txt", "hello\\nworld");
File.WriteAllLines("out.txt", new[] { "line1", "line2" });
File.WriteAllBytes("out.bin", bytes);
File.AppendAllText("log.txt", "another entry\\n");
\`\`\`

## Existence & deletion

\`\`\`csharp
bool exists = File.Exists("notes.txt");
File.Delete("old.tmp");
File.Move("a.txt", "b.txt");
File.Copy("a.txt", "backup/a.txt", overwrite: true);
\`\`\`

## Path manipulation

Always use the \`Path\` class — never concatenate strings:

\`\`\`csharp
string joined = Path.Combine("data", "users", "alice.json");
string ext = Path.GetExtension("photo.jpg");          // ".jpg"
string nameOnly = Path.GetFileNameWithoutExtension("photo.jpg"); // "photo"
string dir = Path.GetDirectoryName("/tmp/foo/bar.txt");          // "/tmp/foo"
string tmp = Path.GetTempFileName();                  // unique temp file
\`\`\`

\`Path.Combine\` handles slashes correctly across platforms.

## Async equivalents

In real apps prefer the async versions to avoid blocking a thread:

\`\`\`csharp
string text = await File.ReadAllTextAsync("notes.txt");
await File.WriteAllTextAsync("out.txt", text);
\`\`\``,
    },
    {
      id: 'l-io-2',
      title: 'Streams: the lower-level API',
      type: 'theory',
      xp: 15,
      theory: `# Streams

A \`Stream\` is the abstraction over **a sequence of bytes you can read and/or write**. Files are streams; so are network sockets, in-memory buffers, and HTTP request bodies.

## The hierarchy

- \`Stream\` (abstract) → \`FileStream\`, \`NetworkStream\`, \`MemoryStream\`, \`GZipStream\`, ...
- \`StreamReader\` / \`StreamWriter\` — wrap a stream, give you text I/O (encoding-aware)
- \`BinaryReader\` / \`BinaryWriter\` — wrap a stream, give you typed binary I/O

## Reading a file line by line

\`\`\`csharp
using var stream = File.OpenRead("big.txt");
using var reader = new StreamReader(stream);

string? line;
while ((line = reader.ReadLine()) != null)
    Console.WriteLine(line);
\`\`\`

This is **streaming** — you don't load the whole file into memory. Perfect for huge files.

\`File.ReadAllLines\` loads everything; \`StreamReader\` lets you process line by line.

## Writing

\`\`\`csharp
using var stream = File.OpenWrite("out.txt");
using var writer = new StreamWriter(stream);
writer.WriteLine("hello");
writer.WriteLine("world");
\`\`\`

## In-memory streams

Useful for tests, building strings, or inter-process buffers:

\`\`\`csharp
using var ms = new MemoryStream();
using var sw = new StreamWriter(ms);
sw.WriteLine("first");
sw.Flush();

ms.Position = 0;
using var sr = new StreamReader(ms);
string text = sr.ReadToEnd();   // "first"
\`\`\`

## Buffering

\`Stream\` reads/writes are slow per-call. \`BufferedStream\` (or the readers/writers above) batch them. Always wrap raw streams when doing many small reads/writes.

## A note on this sandbox

The browser playground runs your code in a sealed environment — \`File.ReadAllText\` will throw because there is **no real filesystem**. \`MemoryStream\` works fine. In a local \`dotnet run\`, the File APIs work as documented.`,
    },
    {
      id: 'l-io-3',
      title: 'Practice: MemoryStream Roundtrip',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Use a `MemoryStream` + `StreamWriter` to write three lines into a buffer, then read them back with a `StreamReader` and print them.\n\nWrite: `"alpha"`, `"beta"`, `"gamma"`\n\nExpected output:\n```\nalpha\nbeta\ngamma\n```',
        starterCode: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        using (var ms = new MemoryStream())
        {
            using (var sw = new StreamWriter(ms, System.Text.Encoding.UTF8, 1024, leaveOpen: true))
            {
                // Write the three lines
            }

            ms.Position = 0;
            using (var sr = new StreamReader(ms))
            {
                // Read every line and Console.WriteLine it
            }
        }
    }
}
`,
        solution: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        using (var ms = new MemoryStream())
        {
            using (var sw = new StreamWriter(ms, System.Text.Encoding.UTF8, 1024, leaveOpen: true))
            {
                sw.WriteLine("alpha");
                sw.WriteLine("beta");
                sw.WriteLine("gamma");
            }

            ms.Position = 0;
            using (var sr = new StreamReader(ms))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                    Console.WriteLine(line);
            }
        }
    }
}`,
        tests: [{ expectedOutput: 'alpha\nbeta\ngamma', description: 'Three lines roundtrip' }],
        hints: [
          'sw.WriteLine adds a newline automatically',
          '`leaveOpen: true` keeps the underlying MemoryStream alive after the writer disposes',
          'Reset ms.Position = 0 before reading',
          'Loop with ReadLine() while it returns non-null',
        ],
      },
    },
    {
      id: 'l-io-4',
      title: 'File I/O Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why prefer `Path.Combine("a", "b")` over `"a" + "/" + "b"`?',
          options: [
            'It\'s shorter',
            'It handles platform-specific separators and trailing slashes correctly',
            'Path.Combine is faster',
            'String concatenation is forbidden in .NET',
          ],
          correctIndex: 1,
          explanation: 'Path.Combine inserts the right separator for the OS and avoids double slashes. Hard-coded "/" breaks on Windows file APIs in some scenarios.',
        },
        {
          question: 'When should you reach for `StreamReader.ReadLine` instead of `File.ReadAllLines`?',
          options: [
            'Always',
            'When the file is small',
            'When the file is huge and you want to process line-by-line without loading all of it into memory',
            'Never — they\'re identical',
          ],
          correctIndex: 2,
          explanation: 'ReadAllLines reads the whole file at once. StreamReader streams line-by-line, keeping memory usage flat regardless of file size.',
        },
        {
          question: 'What does `using` in `using var stream = File.OpenRead(...)` do?',
          options: [
            'Imports the File namespace',
            'Disposes the stream when it goes out of scope',
            'Locks the file',
            'Marks the variable as readonly',
          ],
          correctIndex: 1,
          explanation: 'using declarations call Dispose at the end of the enclosing scope. Critical for streams to release file handles.',
        },
      ],
    },
  ],
};

const chTesting: Chapter = {
  id: 'ch-testing',
  title: 'Unit Testing Basics',
  description: 'xUnit, NUnit, and the AAA pattern',
  icon: '🧪',
  lessons: [
    {
      id: 'l-test-1',
      title: 'Why test?',
      type: 'theory',
      xp: 15,
      theory: `# Unit Testing

A **unit test** is a small, fast, automated check that exercises one piece of behavior in your code. Run hundreds of them in seconds, every commit.

Without tests, every change requires you to manually re-verify the whole app. With tests, the suite catches regressions for you while you sleep.

## What makes a good unit test

- **Fast** — milliseconds, not seconds. You should run them on every save.
- **Isolated** — no real network, no real filesystem (use mocks/in-memory)
- **Deterministic** — same input → same result, every time. No clocks, no random.
- **One thing per test** — when it fails, the name tells you what broke.

## The AAA pattern

Every test has three sections:

\`\`\`csharp
[Fact]
public void Add_TwoPositives_ReturnsSum()
{
    // Arrange — set up the world
    var calc = new Calculator();

    // Act — invoke the thing under test
    int result = calc.Add(2, 3);

    // Assert — check the outcome
    Assert.Equal(5, result);
}
\`\`\`

## Naming

The most-readable convention is \`Method_Scenario_ExpectedResult\`:
- \`Withdraw_AmountExceedsBalance_Throws\`
- \`Parse_EmptyString_ReturnsZero\`
- \`Login_WrongPassword_ReturnsFailure\`

When a test name reads like a sentence, the failure message tells you what's wrong without opening the test.

## Coverage isn't quality

100% line coverage with weak assertions is worthless. Better to have 60% coverage that tests **behavior** than 100% that tests **shape**. Cover branches, edge cases (empty, null, boundaries), and the contracts you promise to callers.`,
    },
    {
      id: 'l-test-2',
      title: 'xUnit, NUnit, MSTest',
      type: 'theory',
      xp: 15,
      theory: `# Test Frameworks

.NET has three big test frameworks. They're all roughly equivalent — most teams pick one and stick with it.

## xUnit (most common in modern .NET)

\`\`\`csharp
using Xunit;

public class CalcTests
{
    [Fact]
    public void Add_Works()
    {
        Assert.Equal(5, 2 + 3);
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(10, 0, 10)]
    [InlineData(-1, 1, 0)]
    public void Add_Cases(int a, int b, int sum)
    {
        Assert.Equal(sum, a + b);
    }
}
\`\`\`

\`[Fact]\` = a single test. \`[Theory]\` + \`[InlineData]\` = a parameterized test, runs once per row.

## NUnit

\`\`\`csharp
using NUnit.Framework;

[TestFixture]
public class CalcTests
{
    [Test]
    public void Add_Works() => Assert.That(2 + 3, Is.EqualTo(5));

    [TestCase(1, 2, 3)]
    [TestCase(10, 0, 10)]
    public void Add_Cases(int a, int b, int sum) => Assert.That(a + b, Is.EqualTo(sum));
}
\`\`\`

## MSTest (Microsoft's, comes pre-installed with VS)

\`\`\`csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class CalcTests
{
    [TestMethod]
    public void Add_Works() => Assert.AreEqual(5, 2 + 3);
}
\`\`\`

## Common assertions

| What | xUnit | NUnit |
|---|---|---|
| Equal | \`Assert.Equal(exp, act)\` | \`Assert.That(act, Is.EqualTo(exp))\` |
| True | \`Assert.True(b)\` | \`Assert.That(b, Is.True)\` |
| Throws | \`Assert.Throws<X>(...)\` | \`Assert.Throws<X>(...)\` |
| Collection contains | \`Assert.Contains(...)\` | \`Assert.That(c, Contains.Item(x))\` |

## FluentAssertions (popular addon)

Reads more like English; works with any framework:

\`\`\`csharp
result.Should().Be(5);
list.Should().HaveCount(3).And.Contain("apple");
Action act = () => calc.Divide(1, 0);
act.Should().Throw<DivideByZeroException>();
\`\`\`

## How to run

\`\`\`bash
dotnet test                       # run every test in the solution
dotnet test --filter Category=Fast
dotnet watch test                 # rerun on every save
\`\`\`

In VS Code / Rider, the test runner has gutter icons next to each \`[Fact]\` so you can run/debug a single test.`,
    },
    {
      id: 'l-test-aaa-code',
      title: 'Practice: AAA pattern',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'A real test framework like xUnit needs a project — outside our sandbox. But the **AAA pattern** is just three labeled blocks. Write `static bool Test_Add_Works()` that:\n\n- **Arrange**: declare ints a=2 and b=3\n- **Act**: compute sum = a + b\n- **Assert**: return sum == 5\n\n`Main()` calls it and prints `PASS` or `FAIL`.\n\nExpected output:\n```\nPASS\n```',
        starterCode: `using System;

class Program
{
    static bool Test_Add_Works()
    {
        // Arrange

        // Act

        // Assert: return whether the result equals the expected
        return false;
    }

    static void Main()
    {
        Console.WriteLine(Test_Add_Works() ? "PASS" : "FAIL");
    }
}
`,
        solution: `using System;

class Program
{
    static bool Test_Add_Works()
    {
        // Arrange
        int a = 2;
        int b = 3;

        // Act
        int sum = a + b;

        // Assert
        return sum == 5;
    }

    static void Main()
    {
        Console.WriteLine(Test_Add_Works() ? "PASS" : "FAIL");
    }
}`,
        tests: [{ expectedOutput: 'PASS', description: 'AAA-shaped test returns true' }],
        hints: [
          'Three blocks, each one statement: declare, compute, compare',
          'Arrange = inputs; Act = the call under test; Assert = the comparison',
          'In real xUnit you would write `Assert.Equal(5, sum);` instead of returning a bool',
        ],
      },
    },
    {
      id: 'l-test-3',
      title: 'Unit Testing Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does the AAA pattern stand for?',
          options: [
            'Assert / Allocate / Assemble',
            'Arrange / Act / Assert',
            'Approve / Apply / Audit',
            'Async / Await / Assert',
          ],
          correctIndex: 1,
          explanation: 'Arrange the test data, Act on the system under test, Assert about the outcome. Three clear sections per test.',
        },
        {
          question: 'In xUnit, which attribute marks a parameterized test?',
          options: ['[Fact]', '[Test]', '[Theory]', '[Parameterized]'],
          correctIndex: 2,
          explanation: '`[Theory]` + `[InlineData]` rows runs the test once per row. `[Fact]` is for a single non-parameterized test.',
        },
        {
          question: 'A test that hits a real database is...',
          options: [
            'A unit test',
            'An integration test',
            'A regression test',
            'A property-based test',
          ],
          correctIndex: 1,
          explanation: 'Unit tests are isolated — no DB, network, or filesystem. Tests that touch real infrastructure are integration tests; they\'re slower and live in a separate project.',
        },
        {
          question: 'Which test name is best?',
          options: [
            'TestAdd',
            'Test1',
            'Add_TwoPositives_ReturnsSum',
            'AdditionMethodValidation',
          ],
          correctIndex: 2,
          explanation: 'Method_Scenario_Expected makes the failure message self-explanatory. The first three give no signal when they fail.',
        },
      ],
    },
  ],
};

const chAsync: Chapter = {
  id: 'ch-async',
  title: 'async / await',
  description: 'Non-blocking code in modern C#',
  icon: '⚡',
  lessons: [
    {
      id: 'l-async-1',
      title: 'What async is for',
      type: 'theory',
      xp: 15,
      theory: `# async / await

\`async\` is C#'s mechanism for **non-blocking I/O**. Most apps spend their lives waiting — for the network, the disk, a database. Async lets the thread move on while the wait happens, so a small thread pool can serve thousands of in-flight requests.

## What async is NOT

- It's not multi-threading. \`await\` doesn't spawn a thread.
- It's not parallelism. To run two CPU-bound tasks at once, use \`Parallel.For\` or \`Task.Run\`, not \`async\`.
- It doesn't make code "go faster" on its own — it lets your **thread** do something else while waiting.

## When to reach for it

Use async for **anything that waits**:
- Network calls (\`HttpClient\`)
- Database queries (\`EF Core\`, \`Dapper\`)
- File I/O (\`File.ReadAllTextAsync\`)
- Timers (\`Task.Delay\`)

Don't bother for in-memory work — making \`int Add(int a, int b)\` async adds overhead with no benefit.

## The mental model

Reading \`await\` as **"pause here until this finishes; meanwhile let the thread do other work"**.

\`\`\`csharp
public async Task<string> FetchUser(int id)
{
    var http = new HttpClient();
    string json = await http.GetStringAsync($"/users/{id}");   // pause
    return json;
}
\`\`\`

While that GET is in flight, no thread is blocked. When the response arrives, execution resumes from the next line.`,
    },
    {
      id: 'l-async-2',
      title: 'async syntax',
      type: 'theory',
      xp: 15,
      theory: `# Writing async methods

Three rules:
1. Mark the method \`async\`
2. Return \`Task\`, \`Task<T>\`, or \`ValueTask\` (NOT \`async void\` except for event handlers)
3. Inside, \`await\` other async methods

\`\`\`csharp
public async Task<int> AddAsync(int a, int b)
{
    await Task.Delay(100);   // simulate I/O
    return a + b;
}
\`\`\`

Notice: the method returns \`int\` from your perspective, but the **signature** says \`Task<int>\`. The \`async\` keyword tells the compiler to wrap your return in a Task.

## Calling async from async

\`\`\`csharp
public async Task RunAsync()
{
    int sum = await AddAsync(2, 3);
    Console.WriteLine(sum);
}
\`\`\`

## Calling async from sync

You usually shouldn't, but two ways:

\`\`\`csharp
// 1. .GetAwaiter().GetResult() — blocks the calling thread
int sum = AddAsync(2, 3).GetAwaiter().GetResult();

// 2. .Result / .Wait() — same idea, but can deadlock in UI/ASP.NET sync contexts
int sum = AddAsync(2, 3).Result;
\`\`\`

In a console \`Main\`, \`async Main\` is supported (and what you'll usually use):

\`\`\`csharp
public static async Task Main(string[] args)
{
    int sum = await AddAsync(2, 3);
    Console.WriteLine(sum);
}
\`\`\`

This is what you'll write in modern code. The \`.GetAwaiter().GetResult()\` form is mostly seen in older code or when something prevents an async entry point.

## Naming

Conventionally, async methods end in \`Async\`: \`GetAsync\`, \`ReadFileAsync\`, \`SendEmailAsync\`. Helpful: when reading code, you can spot the awaitable instantly.`,
    },
    {
      id: 'l-async-3',
      title: 'Practice: Await Two Tasks',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Two async methods are given: `GetGreetingAsync()` returns `"Hello"` after a tiny delay, `GetNameAsync()` returns `"World"`. Combine them with `Task.WhenAll`, then print `"Hello World"`.\n\nExpected output:\n```\nHello World\n```',
        starterCode: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task<string> GetGreetingAsync() { await Task.Delay(10); return "Hello"; }
    static async Task<string> GetNameAsync()     { await Task.Delay(10); return "World"; }

    static async Task RunAsync()
    {
        // Use Task.WhenAll to wait on both, then print "<greeting> <name>"

    }

    static void Main()
    {
        RunAsync().GetAwaiter().GetResult();
    }
}
`,
        solution: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task<string> GetGreetingAsync() { await Task.Delay(10); return "Hello"; }
    static async Task<string> GetNameAsync()     { await Task.Delay(10); return "World"; }

    static async Task RunAsync()
    {
        var t1 = GetGreetingAsync();
        var t2 = GetNameAsync();
        await Task.WhenAll(t1, t2);
        Console.WriteLine(t1.Result + " " + t2.Result);
    }

    static void Main()
    {
        RunAsync().GetAwaiter().GetResult();
    }
}`,
        tests: [{ expectedOutput: 'Hello World', description: 'Two awaited tasks combined' }],
        hints: [
          'Start both tasks WITHOUT awaiting yet (var t1 = GetGreetingAsync(); var t2 = GetNameAsync();)',
          'Then `await Task.WhenAll(t1, t2);` to wait on both in parallel',
          'After WhenAll, t1.Result and t2.Result are populated',
        ],
      },
    },
    {
      id: 'l-async-3-main',
      title: 'Practice: async Main',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Modern C# allows `static async Task Main()` directly — no `RunAsync().GetAwaiter().GetResult()` bridge needed. Rewrite the program below using async Main.\n\nExpected output:\n```\nstart\ndone\n```',
        starterCode: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task DoWorkAsync()
    {
        Console.WriteLine("start");
        await Task.Delay(20);
        Console.WriteLine("done");
    }

    // Convert this Main + bridge to a single async Main
    static void Main()
    {
        DoWorkAsync().GetAwaiter().GetResult();
    }
}
`,
        solution: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task DoWorkAsync()
    {
        Console.WriteLine("start");
        await Task.Delay(20);
        Console.WriteLine("done");
    }

    static async Task Main()
    {
        await DoWorkAsync();
    }
}`,
        tests: [{ expectedOutput: 'start\ndone', description: 'Async Main flows directly' }],
        hints: [
          'Replace `static void Main()` with `static async Task Main()`',
          'Inside the body, just `await DoWorkAsync();` — no GetAwaiter dance',
          'The runtime arranges to wait on the returned Task before exiting',
        ],
      },
    },
    {
      id: 'l-async-4',
      title: 'async Pitfalls',
      type: 'theory',
      xp: 15,
      theory: `# Common async pitfalls

## 1. \`async void\`

Avoid it for everything except event handlers. Exceptions in \`async void\` crash the process — there's no Task to observe them on.

\`\`\`csharp
// BAD
public async void DoStuff() { await Task.Delay(1); throw new Exception(); } // crashes app

// GOOD
public async Task DoStuff() { await Task.Delay(1); throw new Exception(); }
\`\`\`

## 2. \`.Result\` and \`.Wait()\` in async contexts

Calling \`.Result\` on a Task that needs to resume on the same context (UI thread, classic ASP.NET) deadlocks: the thread is blocked waiting for itself.

In modern ASP.NET Core there's no sync context, so \`.Result\` won't deadlock — but it still blocks a thread. Just \`await\` it.

## 3. Forgetting to await

\`\`\`csharp
public async Task SaveAsync()
{
    // forgot to await — the call returns immediately, save is fire-and-forget
    DoExpensiveWorkAsync();
}
\`\`\`

The compiler warns (CS4014). Fix: \`await DoExpensiveWorkAsync();\`.

## 4. Awaiting in a tight loop

\`\`\`csharp
foreach (var url in urls)
    await Fetch(url);   // SEQUENTIAL — one at a time
\`\`\`

To do them in parallel:

\`\`\`csharp
var tasks = urls.Select(u => Fetch(u));
await Task.WhenAll(tasks);
\`\`\`

## 5. ConfigureAwait(false)

In **library code** (no UI), add \`.ConfigureAwait(false)\` to skip the cost of context capture:

\`\`\`csharp
var data = await reader.ReadToEndAsync().ConfigureAwait(false);
\`\`\`

In application code (Web or desktop) the default usually does the right thing. ConfigureAwait(false) is a library-author concern.`,
    },
    {
      id: 'l-async-5',
      title: 'async Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does `async` actually do?',
          options: [
            'Spawns a new thread for the method',
            'Lets the method use `await` to pause without blocking the thread',
            'Runs the method in parallel automatically',
            'Makes the method faster',
          ],
          correctIndex: 1,
          explanation: 'async lets the method use await. await releases the current thread while the awaited task runs, then resumes once it completes.',
        },
        {
          question: 'Why is `async void` discouraged?',
          options: [
            'Slower than async Task',
            'Exceptions inside crash the process — there\'s no Task to observe them on',
            'Doesn\'t compile',
            'It\'s deprecated in C# 11',
          ],
          correctIndex: 1,
          explanation: 'A Task lets the caller observe completion and exceptions. void doesn\'t — uncaught exceptions in async void escape to AppDomain.UnhandledException.',
        },
        {
          question: 'How do you run two async tasks in parallel and wait for both?',
          options: [
            'await both in sequence',
            'Wrap them in Task.Run and await each',
            'Start both, then `await Task.WhenAll(t1, t2)`',
            'Use Task.Wait()',
          ],
          correctIndex: 2,
          explanation: 'Start both — they\'re running. WhenAll yields a single task that completes when all input tasks are done.',
        },
        {
          question: 'When should you use `.GetAwaiter().GetResult()`?',
          options: [
            'Always, instead of await',
            'Only when bridging from sync code to async, knowing it blocks the calling thread',
            'When you want to skip exception handling',
            'Never — it\'s removed in .NET 9',
          ],
          correctIndex: 1,
          explanation: 'It\'s the sync-over-async bridge. Use sparingly — at the top of a sync entry point. Inside async code, just use await.',
        },
      ],
    },
  ],
};

const chTask: Chapter = {
  id: 'ch-task',
  title: 'Task, ValueTask & Cancellation',
  description: 'The async building blocks',
  icon: '⏳',
  lessons: [
    {
      id: 'l-tk-1',
      title: 'Task<T> basics',
      type: 'theory',
      xp: 15,
      theory: `# Task<T>

A \`Task\` is a handle to an in-flight piece of work. \`Task<T>\` produces a value of type T when complete.

## Creating tasks

\`\`\`csharp
Task t1 = Task.Run(() => DoSomething());      // run on the thread pool
Task t2 = Task.Delay(500);                     // a timer task
Task<int> t3 = AddAsync(2, 3);                 // an async method's return
Task<int> t4 = Task.FromResult(42);            // already-completed task
\`\`\`

## Composing tasks

\`\`\`csharp
await t1;                                      // wait for completion (no return)
int r = await t3;                              // wait + extract value

await Task.WhenAll(t1, t2, t3);                // wait for all
Task<int> first = await Task.WhenAny(t3, t4);  // wait for first
\`\`\`

## Exceptions

If a task fails, awaiting it **rethrows** the exception:

\`\`\`csharp
try
{
    int r = await DivideAsync(1, 0);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine(ex.Message);
}
\`\`\`

If you don't await, the exception is silently captured in the task and lost (unless you observe \`task.Exception\` later).

## Task vs Task.Run

\`\`\`csharp
async Task<int> ReadFileAsync()
{
    return await File.ReadAllTextAsync("data.txt").Length;   // I/O bound
}

Task<int> Compute()
{
    return Task.Run(() => Fibonacci(40));   // CPU bound
}
\`\`\`

- I/O work: just \`await\` the async API — no Task.Run needed.
- CPU work: wrap in Task.Run to push it onto the thread pool.

\`Task.Run\` for I/O is wasteful — it blocks a thread pool thread instead of releasing it.`,
    },
    {
      id: 'l-tk-2',
      title: 'ValueTask',
      type: 'theory',
      xp: 15,
      theory: `# ValueTask<T>

\`Task<T>\` is a class — every async method that returns one allocates. For methods that **often complete synchronously** (cache hit, fast path), the allocation is wasted.

\`ValueTask<T>\` is a struct that can hold either a synchronous value or a Task — no allocation in the sync path.

\`\`\`csharp
private string? _cached;

public async ValueTask<string> GetAsync()
{
    if (_cached != null) return _cached;          // sync path — no Task allocation
    _cached = await FetchAsync();                 // async path — allocates
    return _cached;
}
\`\`\`

## When to use it

- **Hot async path** that often returns synchronously (cache, lazy initializer)
- **High-throughput** scenarios where allocations matter

## When NOT

- General application code — \`Task<T>\` is simpler and almost as fast
- When you await the same ValueTask twice (it's only safe to await once) — Task is reusable

Most C# code never needs ValueTask. It's a tool for library authors and hot-path APIs.

## await once

A ValueTask can wrap an \`IValueTaskSource\` that's pooled and reused. Awaiting twice can return stale results. If you really need to await twice, do this:

\`\`\`csharp
ValueTask<int> v = GetAsync();
Task<int> t = v.AsTask();   // converts to a normal Task you can await many times
\`\`\``,
    },
    {
      id: 'l-tk-3',
      title: 'CancellationToken',
      type: 'theory',
      xp: 15,
      theory: `# CancellationToken

Long-running async work needs a way to **stop early**: user clicked cancel, request timed out, app is shutting down.

The .NET pattern: pass a \`CancellationToken\` and check it / pass it to inner calls.

## Using it

\`\`\`csharp
public async Task DownloadAsync(string url, CancellationToken ct)
{
    using var http = new HttpClient();
    using var stream = await http.GetStreamAsync(url, ct);   // cancellable

    var buf = new byte[4096];
    int n;
    while ((n = await stream.ReadAsync(buf, 0, buf.Length, ct)) > 0)
    {
        ct.ThrowIfCancellationRequested();   // explicit checkpoint
        // process buf[0..n]
    }
}
\`\`\`

## Producing one

\`\`\`csharp
var cts = new CancellationTokenSource();
cts.CancelAfter(TimeSpan.FromSeconds(5));   // auto-cancel after 5s

try
{
    await DownloadAsync(url, cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("timed out");
}
\`\`\`

## Patterns

- **CancelAfter** — built-in timeout
- **Cancel()** — manual: e.g. user clicked Cancel
- **Linked tokens** — combine multiple sources:

\`\`\`csharp
using var linked = CancellationTokenSource.CreateLinkedTokenSource(userCt, timeoutCt);
await DoWork(linked.Token);   // cancels if EITHER source cancels
\`\`\`

## Etiquette

- Library authors: **always** accept a CancellationToken parameter (often defaulted to \`default\`)
- App authors: **always** flow it through every async call
- Never swallow \`OperationCanceledException\` in a generic \`catch (Exception)\` — let it propagate so the caller sees the cancel`,
    },
    {
      id: 'l-tk-cancel-code',
      title: 'Practice: CancellationToken',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Implement `WaitWithCancelAsync(CancellationToken ct)` that calls `Task.Delay(2000, ct)`. `Main()` already creates a `CancellationTokenSource` that cancels after 50 ms; catch the resulting `OperationCanceledException` and print `"cancelled"`.\n\nExpected output:\n```\ncancelled\n```',
        starterCode: `using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task WaitWithCancelAsync(CancellationToken ct)
    {
        // call Task.Delay with ct so it cancels promptly when ct fires
    }

    static async Task Main()
    {
        using var cts = new CancellationTokenSource(50);
        try
        {
            await WaitWithCancelAsync(cts.Token);
            Console.WriteLine("finished");
        }
        catch (/* what kind of exception? */)
        {
            Console.WriteLine("?");
        }
    }
}
`,
        solution: `using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task WaitWithCancelAsync(CancellationToken ct)
    {
        await Task.Delay(2000, ct);
    }

    static async Task Main()
    {
        using var cts = new CancellationTokenSource(50);
        try
        {
            await WaitWithCancelAsync(cts.Token);
            Console.WriteLine("finished");
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("cancelled");
        }
    }
}`,
        tests: [{ expectedOutput: 'cancelled', description: 'Task.Delay observes the token and throws OCE' }],
        hints: [
          '`await Task.Delay(2000, ct)` — Delay accepts the token and throws OperationCanceledException when it fires',
          'Catch `OperationCanceledException` (NOT plain Exception, which would mask intent)',
          'CancellationTokenSource(50) auto-cancels after 50 ms',
        ],
      },
    },
    {
      id: 'l-tk-4',
      title: 'Task & Cancellation Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the difference between Task and ValueTask?',
          options: [
            'Task is faster',
            'ValueTask is a struct that avoids allocation when the operation completes synchronously',
            'Task is for CPU work, ValueTask is for I/O',
            'ValueTask is deprecated',
          ],
          correctIndex: 1,
          explanation: 'ValueTask wraps either a sync value or a Task. In hot async code that often hits a fast/cached path, it skips the heap allocation Task<T> requires.',
        },
        {
          question: 'What does `await Task.WhenAll(t1, t2)` do?',
          options: [
            'Runs t1 and t2 in serial',
            'Waits for the first task to complete',
            'Waits for ALL tasks to complete; faults if any failed',
            'Cancels both tasks',
          ],
          correctIndex: 2,
          explanation: 'WhenAll waits for every task. If any threw, the aggregate exception is rethrown.',
        },
        {
          question: 'What should a long-running async method accept as a parameter?',
          options: [
            'a TimeSpan',
            'a CancellationToken',
            'a Thread',
            'a Stopwatch',
          ],
          correctIndex: 1,
          explanation: 'CancellationToken is the .NET pattern for cooperative cancellation. Pass it to every async call and check it at safe points.',
        },
        {
          question: 'When should you wrap I/O in `Task.Run`?',
          options: [
            'Always — it\'s required for async',
            'Never — Task.Run blocks a thread that the I/O await would have released',
            'Only on Windows',
            'Only for HttpClient',
          ],
          correctIndex: 1,
          explanation: 'Task.Run is for CPU work. Wrapping I/O in Task.Run defeats the entire purpose of async by burning a thread pool thread on what would otherwise be free.',
        },
      ],
    },
  ],
};

const chThreading: Chapter = {
  id: 'ch-threading',
  title: 'Threading & Synchronization',
  description: 'When you actually need parallelism',
  icon: '🧵',
  lessons: [
    {
      id: 'l-th-1',
      title: 'Threads & ThreadPool',
      type: 'theory',
      xp: 15,
      theory: `# Threads, the low-level primitive

A **thread** is the smallest unit of execution the OS can schedule. Modern apps rarely create raw threads — but they're the foundation everything else builds on.

\`\`\`csharp
using System.Threading;

var t = new Thread(() => Console.WriteLine("from another thread"));
t.Start();
t.Join();   // wait for completion
\`\`\`

\`Thread.Sleep(ms)\` blocks the thread for ms milliseconds — wastes a thread. Prefer \`await Task.Delay(ms)\` in async code.

## ThreadPool

The CLR maintains a pool of pre-warmed threads. Most APIs that "run on the background" use this pool:

\`\`\`csharp
ThreadPool.QueueUserWorkItem(_ => Console.WriteLine("hi"));
Task.Run(() => Console.WriteLine("hi"));   // higher-level wrapper
\`\`\`

The pool grows and shrinks based on load. Don't block its threads with long sleeps or sync I/O — you'll starve other work.

## Parallel.For / Parallel.ForEach

For embarrassingly parallel CPU work:

\`\`\`csharp
Parallel.For(0, 1000, i => {
    results[i] = HeavyCompute(i);
});

Parallel.ForEach(items, item => Process(item));
\`\`\`

The runtime divides work across pool threads automatically.`,
    },
    {
      id: 'l-th-2',
      title: 'Race conditions & lock',
      type: 'theory',
      xp: 15,
      theory: `# Race conditions

When two threads touch the same data without coordination, you get **races**. The result depends on timing — sometimes correct, sometimes broken, never reliable.

\`\`\`csharp
int counter = 0;
Parallel.For(0, 1_000_000, _ => counter++);
Console.WriteLine(counter);   // NOT 1,000,000 — usually less
\`\`\`

\`counter++\` is **read, increment, write** — three steps. Two threads can both read the same value, both increment, both write — losing one update.

## lock — mutual exclusion

\`\`\`csharp
private readonly object _gate = new object();
private int _counter;

public void Increment()
{
    lock (_gate)
    {
        _counter++;
    }
}
\`\`\`

\`lock\` ensures only one thread is inside the block at a time. The simplest correct solution.

## Rules of lock

1. **Lock on a private object**, not on \`this\` (other code might lock on you)
2. **Hold locks briefly** — don't do I/O or call user code under a lock; risks deadlock
3. **Always release** — lock auto-releases on exit/exception, but \`Monitor.Enter\` without the using-pattern doesn't
4. **Pick a consistent order** when locking multiple objects — out-of-order locks deadlock`,
    },
    {
      id: 'l-th-3',
      title: 'Interlocked & SemaphoreSlim',
      type: 'theory',
      xp: 15,
      theory: `# Lighter-weight primitives

\`lock\` is fine for most cases. For specific patterns, lighter tools exist.

## Interlocked — atomic ops on int/long

\`\`\`csharp
int counter = 0;
Parallel.For(0, 1_000_000, _ => Interlocked.Increment(ref counter));
Console.WriteLine(counter);   // 1,000,000 every time
\`\`\`

Faster than \`lock\` for simple counters. The CPU instruction is atomic — no thread coordination cost.

Other Interlocked operations:
- \`Interlocked.Decrement(ref n)\`
- \`Interlocked.Add(ref n, delta)\`
- \`Interlocked.Exchange(ref n, newValue)\` — set and return old
- \`Interlocked.CompareExchange(ref n, newValue, expected)\` — set only if current == expected

## SemaphoreSlim — limit concurrency

\`\`\`csharp
private static readonly SemaphoreSlim _gate = new SemaphoreSlim(initialCount: 5);

public async Task DoLimitedAsync()
{
    await _gate.WaitAsync();
    try
    {
        await DoWorkAsync();
    }
    finally
    {
        _gate.Release();
    }
}
\`\`\`

This caps concurrency at 5. Useful for rate-limiting outbound HTTP calls, DB connections, etc.

\`SemaphoreSlim\` is **async-friendly** (\`WaitAsync\`); the older \`Semaphore\` is not.

## ReaderWriterLockSlim

When reads vastly outnumber writes:

\`\`\`csharp
private readonly ReaderWriterLockSlim _rw = new();
\`\`\`

Many readers can hold the lock simultaneously; writers get exclusive access. More complex than \`lock\` — only reach for it when measurements justify the complexity.

## When to pick what

| Need | Use |
|---|---|
| Mutual exclusion, simple | \`lock\` |
| Atomic int/long counters | \`Interlocked\` |
| Cap concurrency | \`SemaphoreSlim\` |
| Many readers, few writers | \`ReaderWriterLockSlim\` |
| Coordinate threads | \`ManualResetEventSlim\`, \`AutoResetEvent\` |
| Channel of values | \`System.Threading.Channels\` (advanced) |`,
    },
    {
      id: 'l-th-4',
      title: 'Practice: Atomic Counter',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Use `Parallel.For` to increment a shared counter 100,000 times **safely**, using `Interlocked.Increment`. Print the final value.\n\nExpected output:\n```\n100000\n```',
        starterCode: `using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static int counter = 0;

    static void Main()
    {
        Parallel.For(0, 100000, _ =>
        {
            // Increment counter atomically

        });
        Console.WriteLine(counter);
    }
}
`,
        solution: `using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static int counter = 0;

    static void Main()
    {
        Parallel.For(0, 100000, _ =>
        {
            Interlocked.Increment(ref counter);
        });
        Console.WriteLine(counter);
    }
}`,
        tests: [{ expectedOutput: '100000', description: 'Atomic counter sums to 100000' }],
        hints: [
          'Use Interlocked.Increment(ref counter)',
          'Without it, plain `counter++` would race and the result would be less than 100000',
        ],
      },
    },
    {
      id: 'l-th-5',
      title: 'Threading Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What problem does `lock` solve?',
          options: [
            'Slow code',
            'Race conditions — only one thread at a time enters the locked block',
            'Memory leaks',
            'CPU usage',
          ],
          correctIndex: 1,
          explanation: 'lock provides mutual exclusion. Threads compete to enter; only one wins, others wait.',
        },
        {
          question: 'When should you prefer `Interlocked.Increment` over `lock`?',
          options: [
            'Always — it\'s simpler',
            'For atomic operations on a single int/long counter',
            'For protecting a complex multi-step transaction',
            'Never — Interlocked is deprecated',
          ],
          correctIndex: 1,
          explanation: 'Interlocked is hardware-atomic for simple ops on a single value. It\'s faster and lock-free. For multi-step logic touching multiple variables, you still need lock.',
        },
        {
          question: 'Why is `lock (this)` discouraged?',
          options: [
            'Slower than locking on a private object',
            'Outside code may also lock on the same instance, causing unrelated deadlocks',
            'Doesn\'t compile',
            'Causes thread starvation',
          ],
          correctIndex: 1,
          explanation: 'If your class instance is publicly visible, anyone could lock on it. Use a private dedicated lock object so only your class controls it.',
        },
        {
          question: 'What does `SemaphoreSlim(initialCount: 5)` do?',
          options: [
            'Creates exactly 5 threads',
            'Limits concurrency: at most 5 threads can be inside the gated section at once',
            'Caches up to 5 results',
            'Spawns 5 background tasks',
          ],
          correctIndex: 1,
          explanation: 'Semaphores limit concurrent access. With initialCount=5, the 6th caller blocks until one of the others releases.',
        },
      ],
    },
  ],
};

const chPatterns: Chapter = {
  id: 'ch-patterns',
  title: 'Pattern Matching',
  description: 'Modern switching and type checks',
  icon: '🎯',
  lessons: [
    {
      id: 'l-pat-1',
      title: 'is patterns',
      type: 'theory',
      xp: 15,
      theory: `# Pattern Matching

C# 7 added **patterns** — concise, declarative ways to test a value's type and shape.

## The classic type-test

Old way:

\`\`\`csharp
object o = 42;
if (o is int)
{
    int n = (int)o;
    Console.WriteLine(n);
}
\`\`\`

With type pattern (C# 7+):

\`\`\`csharp
if (o is int n)
{
    Console.WriteLine(n);
}
\`\`\`

The variable \`n\` is declared and bound in the same expression — no cast needed.

## Constant patterns

\`\`\`csharp
if (status is null) ...
if (n is 0) ...
\`\`\`

## Logical patterns (C# 9+)

\`\`\`csharp
if (n is > 0 and < 100) ...
if (color is "red" or "blue") ...
if (s is not null) ...
\`\`\`

## Property patterns (C# 8+)

\`\`\`csharp
if (person is { Name: "Alice", Age: > 18 }) ...
\`\`\`

## Tuple patterns (C# 8+)

\`\`\`csharp
if ((status, role) is ("active", "admin")) ...
\`\`\`

## Where they shine

- Replacing chains of \`is\` + cast
- Filtering \`Where(x => x is Cat c && c.Age > 5)\`
- \`switch\` (next lesson)

All of these compile and run in our sandbox (.NET 9). Try them out.`,
    },
    {
      id: 'l-pat-2',
      title: 'switch statement & expression',
      type: 'theory',
      xp: 15,
      theory: `# switch + patterns

The classic \`switch\` statement got an upgrade — it can branch on patterns, not just constants.

\`\`\`csharp
abstract class Shape { }
class Circle    : Shape { public double R; }
class Rectangle : Shape { public double W, H; }

static double Area(Shape s)
{
    switch (s)
    {
        case Circle c:
            return Math.PI * c.R * c.R;
        case Rectangle r:
            return r.W * r.H;
        default:
            throw new ArgumentException();
    }
}
\`\`\`

The \`case Circle c:\` is a **type pattern** — match the type and bind a variable.

## switch expression (C# 8+)

A more concise form for "value in, value out":

\`\`\`csharp
static double Area(Shape s) => s switch
{
    Circle c        => Math.PI * c.R * c.R,
    Rectangle r     => r.W * r.H,
    _               => throw new ArgumentException()
};
\`\`\`

The \`_\` is the discard pattern — equivalent to \`default\`.

## with property patterns (C# 8+)

\`\`\`csharp
static string Tier(Customer c) => c switch
{
    { IsVip: true, Age: >= 18 } => "premium",
    { Age: < 18 }               => "student",
    _                            => "regular"
};
\`\`\`

## with tuple patterns

\`\`\`csharp
static string Outcome(int hp, bool healed) => (hp, healed) switch
{
    (<= 0, _)   => "dead",
    (_, true)   => "stable",
    _           => "wounded"
};
\`\`\`

## Why use it

- Pattern + binding in one place
- Compiler checks **exhaustiveness** for sealed hierarchies
- Compose nested conditions tersely
- Fewer cast errors

All forms here — relational patterns, property patterns, tuple patterns — compile in our sandbox. The code lesson uses a switch expression directly.`,
    },
    {
      id: 'l-pat-3',
      title: 'Practice: Shape Area (switch expression)',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Implement `static double Area(Shape s)` using a `switch` expression with type patterns.\n\n- `Circle` → π × r²\n- `Rectangle` → w × h\n- Anything else → 0\n\n`Main()` calls Area on a Circle(2) and a Rectangle(3, 4) and prints both rounded to 2 decimals.\n\nExpected output:\n```\n12.57\n12.00\n```',
        starterCode: `using System;
using System.Globalization;

abstract class Shape { }
class Circle : Shape { public double R; }
class Rectangle : Shape { public double W, H; }

class Program
{
    static double Area(Shape s) => s switch
    {
        // Circle c    => ...,
        // Rectangle r => ...,
        _ => 0,
    };

    static void Main()
    {
        Console.WriteLine(Area(new Circle { R = 2 }).ToString("F2", CultureInfo.InvariantCulture));
        Console.WriteLine(Area(new Rectangle { W = 3, H = 4 }).ToString("F2", CultureInfo.InvariantCulture));
    }
}
`,
        solution: `using System;
using System.Globalization;

abstract class Shape { }
class Circle : Shape { public double R; }
class Rectangle : Shape { public double W, H; }

class Program
{
    static double Area(Shape s) => s switch
    {
        Circle c    => Math.PI * c.R * c.R,
        Rectangle r => r.W * r.H,
        _           => 0,
    };

    static void Main()
    {
        Console.WriteLine(Area(new Circle { R = 2 }).ToString("F2", CultureInfo.InvariantCulture));
        Console.WriteLine(Area(new Rectangle { W = 3, H = 4 }).ToString("F2", CultureInfo.InvariantCulture));
    }
}`,
        tests: [{ expectedOutput: '12.57\n12.00', description: 'Shape areas via switch expression' }],
        hints: [
          '`Circle c => ...,` is a type pattern — matches when s is a Circle and binds c',
          'Each arm returns the area of that shape',
          '`_ => 0` is the default arm',
        ],
      },
    },
    {
      id: 'l-pat-4',
      title: 'Pattern Matching Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does `if (o is int n)` do?',
          options: [
            'Throws if o is not int',
            'Tests AND binds: if o is an int, declares n with that value',
            'Casts o to int explicitly',
            'Compares o to int',
          ],
          correctIndex: 1,
          explanation: 'Type pattern. Tests, casts, and binds in one expression. n is in scope only inside the if branch.',
        },
        {
          question: 'In `case Circle c:`, what is `c`?',
          options: [
            'A copy of the matched object',
            'The matched object, statically typed as Circle, no cast needed',
            'A new Circle instance',
            'A nullable reference',
          ],
          correctIndex: 1,
          explanation: 'It\'s the same object, but the variable c has type Circle so you can call Circle members directly.',
        },
        {
          question: 'What does `_` mean in a switch expression?',
          options: [
            'Null',
            'Discard pattern — matches anything (like default)',
            'Compile error',
            'A wildcard variable',
          ],
          correctIndex: 1,
          explanation: 'The discard pattern matches anything and ignores the value. Equivalent to default in a switch statement.',
        },
        {
          question: 'Why prefer pattern matching over `is X` + cast + member access?',
          options: [
            'Faster runtime',
            'Less code, no cast errors, the bound variable is statically typed',
            'Required by the runtime',
            'Stylistic preference only',
          ],
          correctIndex: 1,
          explanation: 'Patterns combine the test, cast, and binding. You can\'t accidentally cast to the wrong type or forget the cast.',
        },
      ],
    },
  ],
};

const chTuples: Chapter = {
  id: 'ch-tuples',
  title: 'Tuples & Deconstruction',
  description: 'Lightweight grouping of values',
  icon: '🪢',
  lessons: [
    {
      id: 'l-tup-1',
      title: 'Value Tuples',
      type: 'theory',
      xp: 15,
      theory: `# Value Tuples

A **tuple** is a quick way to group a few related values without defining a class. C# 7+ tuples are **value types** — cheap, no heap allocation.

## Anonymous

\`\`\`csharp
var pair = (1, "alpha");
Console.WriteLine(pair.Item1);   // 1
Console.WriteLine(pair.Item2);   // "alpha"
\`\`\`

## Named members

\`\`\`csharp
var person = (Name: "Alice", Age: 30);
Console.WriteLine(person.Name);
Console.WriteLine(person.Age);
\`\`\`

Names exist at compile time — they're just sugar over Item1/Item2 — but make code far more readable.

## Tuples as method returns

Without tuples, methods that need to return multiple values used \`out\` or a custom struct. Tuples are simpler:

\`\`\`csharp
static (int min, int max) FindRange(int[] nums)
{
    return (nums.Min(), nums.Max());
}

var r = FindRange(new[] { 5, 2, 8, 1, 9 });
Console.WriteLine($"min={r.min} max={r.max}");
\`\`\`

## Tuple equality

\`\`\`csharp
var a = (1, "x");
var b = (1, "x");
Console.WriteLine(a == b);   // true (compares Item1 + Item2)
\`\`\`

A tuple equals another tuple if all its components equal pairwise.

## When NOT to use tuples

For values that travel between layers / get serialized / need methods, use a \`record\` or a regular class. Tuples shine for **local** grouping; abuse them and your codebase fills with \`(x, y, z)\` calls where nobody knows what x is.`,
    },
    {
      id: 'l-tup-2',
      title: 'Deconstruction',
      type: 'theory',
      xp: 15,
      theory: `# Deconstruction

Deconstruction unpacks a tuple (or any deconstructable type) into separate variables in one line:

\`\`\`csharp
var (name, age) = ("Alice", 30);
Console.WriteLine(name);   // "Alice"
Console.WriteLine(age);    // 30
\`\`\`

## With a method that returns a tuple

\`\`\`csharp
static (int min, int max) FindRange(int[] nums) => (nums.Min(), nums.Max());

var (lo, hi) = FindRange(new[] { 5, 2, 8 });
\`\`\`

## Discard with \`_\`

When you only care about some pieces:

\`\`\`csharp
var (_, age) = GetPerson();   // ignore name
var (lo, _, _) = GetStats();  // ignore last two
\`\`\`

## Custom Deconstruct

Any type can be deconstructable by adding a \`Deconstruct\` method:

\`\`\`csharp
class Point
{
    public int X { get; set; }
    public int Y { get; set; }
    public void Deconstruct(out int x, out int y) { x = X; y = Y; }
}

var p = new Point { X = 3, Y = 4 };
var (x, y) = p;        // 3, 4
\`\`\`

## In foreach

\`\`\`csharp
var pairs = new[] { (1, "a"), (2, "b"), (3, "c") };
foreach (var (n, s) in pairs)
    Console.WriteLine($"{n}: {s}");
\`\`\`

This pattern is everywhere with Dictionary too — \`KeyValuePair<K,V>\` deconstructs into the key + value.`,
    },
    {
      id: 'l-tup-3',
      title: 'Practice: Min/Max Tuple',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Write a method `(int min, int max) Range(int[] nums)` that returns the smallest and largest values. Then in `Main`, deconstruct the result and print `min=X max=Y`.\n\nFor `{ 5, 2, 8, 1, 9 }`:\n```\nmin=1 max=9\n```',
        starterCode: `using System;
using System.Linq;

class Program
{
    // Define Range here

    static void Main()
    {
        int[] nums = { 5, 2, 8, 1, 9 };
        // Call Range, deconstruct, print

    }
}
`,
        solution: `using System;
using System.Linq;

class Program
{
    static (int min, int max) Range(int[] nums) => (nums.Min(), nums.Max());

    static void Main()
    {
        int[] nums = { 5, 2, 8, 1, 9 };
        var (lo, hi) = Range(nums);
        Console.WriteLine($"min={lo} max={hi}");
    }
}`,
        tests: [{ expectedOutput: 'min=1 max=9', description: 'Tuple return + deconstruction' }],
        hints: [
          'Method signature: `static (int min, int max) Range(int[] nums)`',
          'Body can be expression-bodied: `=> (nums.Min(), nums.Max());`',
          'Deconstruct with `var (lo, hi) = Range(nums);`',
        ],
      },
    },
  ],
};

const chIterators: Chapter = {
  id: 'ch-iterators',
  title: 'Iterators & yield return',
  description: 'Lazy, on-demand sequences',
  icon: '🔁',
  lessons: [
    {
      id: 'l-it-1',
      title: 'yield return',
      type: 'theory',
      xp: 15,
      theory: `# Iterators

A method whose body uses \`yield return\` becomes an **iterator** — it produces values one at a time, on demand.

\`\`\`csharp
static IEnumerable<int> Naturals()
{
    int n = 1;
    while (true)
    {
        yield return n;
        n++;
    }
}

foreach (var n in Naturals().Take(5))
    Console.WriteLine(n);
// 1, 2, 3, 4, 5
\`\`\`

The method returns \`IEnumerable<T>\`. The body looks normal but it doesn't run all at once — each \`MoveNext()\` from the foreach drives one iteration up to the next \`yield return\`.

## Why this is powerful

- **Infinite sequences** — produce values forever without exhausting memory
- **Lazy filtering** — process huge files line by line without loading the whole thing
- **Composable** — chain with LINQ; results computed only when iterated

## yield break

Stop early:

\`\`\`csharp
static IEnumerable<int> UpTo(int max)
{
    for (int i = 1; i <= max; i++)
        yield return i;
    yield break;   // explicit; here it's redundant since the loop already ended
}
\`\`\`

## State machine under the hood

The compiler rewrites your iterator into a state machine class that captures local variables and tracks where it left off. You don't need to think about it — just remember that the body is **paused** between yields, not re-run.

## Differences from a List<T>

\`\`\`csharp
List<int> nums = new() { 1, 2, 3 };          // builds eagerly, allocates list
IEnumerable<int> seq = ProduceLazy();        // builds nothing yet
\`\`\`

If you'll iterate the sequence multiple times, materialize once with \`.ToList()\`. Otherwise the iterator runs from the top each time.`,
    },
    {
      id: 'l-it-2',
      title: 'Practice: First N primes',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Implement an iterator method `IEnumerable<int> Primes()` that yields primes 2, 3, 5, 7, 11, ... forever (one at a time).\n\nIn `Main`, take the first 5 and print one per line.\n\nExpected output:\n```\n2\n3\n5\n7\n11\n```\n\nA simple primality check (trial division up to √n) is fine.',
        starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static IEnumerable<int> Primes()
    {
        // yield primes 2, 3, 5, 7, ...
        yield break;
    }

    static void Main()
    {
        foreach (var p in Primes().Take(5))
            Console.WriteLine(p);
    }
}
`,
        solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static IEnumerable<int> Primes()
    {
        for (int n = 2; ; n++)
        {
            bool prime = true;
            for (int d = 2; (long)d * d <= n; d++)
                if (n % d == 0) { prime = false; break; }
            if (prime) yield return n;
        }
    }

    static void Main()
    {
        foreach (var p in Primes().Take(5))
            Console.WriteLine(p);
    }
}`,
        tests: [{ expectedOutput: '2\n3\n5\n7\n11', description: 'First 5 primes' }],
        hints: [
          'Loop n from 2 forever (no upper bound — use `for (int n = 2; ; n++)`)',
          'For each n, test divisibility by d from 2 up to sqrt(n)',
          'If no divisor found, `yield return n` — don\'t add to a list',
          'Take(5) on the caller side stops iteration',
        ],
      },
    },
    {
      id: 'l-it-3',
      title: 'Iterators vs LINQ',
      type: 'theory',
      xp: 15,
      theory: `# Iterators vs LINQ

LINQ's \`Where\`, \`Select\`, \`Take\` etc. are **all iterators**. They compose lazily.

\`\`\`csharp
IEnumerable<int> nums = Enumerable.Range(1, 1_000_000);
IEnumerable<int> step = nums.Where(n => n % 7 == 0).Select(n => n * 2).Take(5);

foreach (var x in step) Console.WriteLine(x);
\`\`\`

Even though the source is a million numbers, only the **first few** are pulled — the pipeline pulls one at a time, stops once Take(5) is satisfied.

## When to write your own iterator

When LINQ doesn't express what you need:

- Stateful sequences (Fibonacci, primes, rolling windows)
- Reading lines from a stream
- Walking a tree depth-first / breadth-first
- Generating combinations / permutations

If you can do it with \`Where\` / \`Select\` / \`SelectMany\`, prefer LINQ — it's more readable and well-tested.

## Side effects warning

Iterators run the body **each time** they're iterated. If your body has a side effect (logging, opening a file), it runs each time someone foreaches the result.

\`\`\`csharp
static IEnumerable<int> Loud()
{
    Console.WriteLine("starting");
    yield return 1;
    yield return 2;
}

var seq = Loud();
foreach (var n in seq) { /* prints "starting" */ }
foreach (var n in seq) { /* prints "starting" again */ }
\`\`\`

Materialize once if you need the side effect to run only once: \`var list = Loud().ToList();\``,
    },
    {
      id: 'l-it-4',
      title: 'Iterators Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does the body of an iterator method run?',
          options: [
            'Immediately when called',
            'Lazily — only as the consumer iterates the result',
            'Once at compile time',
            'In a background thread',
          ],
          correctIndex: 1,
          explanation: 'Calling an iterator returns an IEnumerable but doesn\'t execute the body. Each call to MoveNext() drives one step of the body up to the next yield.',
        },
        {
          question: 'What does `yield break` do?',
          options: [
            'Pauses the iterator',
            'Throws an exception',
            'Ends the sequence — no more values',
            'Skips one iteration',
          ],
          correctIndex: 2,
          explanation: 'yield break ends iteration. The foreach loop on the consumer side completes normally.',
        },
        {
          question: 'You iterate a custom iterator twice. The body...',
          options: [
            'Runs once and is cached',
            'Runs from the start each time, including any side effects',
            'Throws InvalidOperationException',
            'Skips the first iteration',
          ],
          correctIndex: 1,
          explanation: 'Each foreach starts a new state machine. If you want one-time evaluation, materialize with ToList()/ToArray().',
        },
        {
          question: 'Why prefer iterators over building a List<T>?',
          options: [
            'Faster to write',
            'Avoid allocating intermediate collections; supports infinite sequences and early termination',
            'Required by the runtime',
            'There\'s no difference',
          ],
          correctIndex: 1,
          explanation: 'Lazy iteration uses constant memory regardless of length, supports infinite sequences, and stops as soon as the consumer is satisfied.',
        },
      ],
    },
  ],
};

const chReflection: Chapter = {
  id: 'ch-reflection',
  title: 'Reflection & Attributes',
  description: 'Inspect and decorate types at runtime',
  icon: '🔍',
  lessons: [
    {
      id: 'l-rf-1',
      title: 'The Type API',
      type: 'theory',
      xp: 15,
      theory: `# Reflection

**Reflection** is the ability to inspect types, members, and metadata at runtime. It's how serializers, ORMs, DI containers, and test frameworks "know" how to work with arbitrary types.

## Getting a Type

\`\`\`csharp
Type t1 = typeof(string);                    // compile-time
Type t2 = "hello".GetType();                 // runtime instance
Type t3 = Type.GetType("System.DateTime");   // by name
\`\`\`

## What you can ask about a Type

\`\`\`csharp
Type t = typeof(DateTime);
t.Name;            // "DateTime"
t.FullName;        // "System.DateTime"
t.IsValueType;     // true
t.BaseType;        // typeof(ValueType)
t.GetMethods();    // MethodInfo[] of public methods
t.GetProperties(); // PropertyInfo[] of public properties
t.GetMethod("AddDays"); // a specific method
\`\`\`

## Invoking via reflection

\`\`\`csharp
Type calcType = typeof(Calculator);
object calc = Activator.CreateInstance(calcType);   // calls parameterless ctor
MethodInfo addMethod = calcType.GetMethod("Add");
object result = addMethod.Invoke(calc, new object[] { 2, 3 });
Console.WriteLine(result);   // 5
\`\`\`

## Performance

Reflection is **slow** compared to direct calls — every Invoke does method lookup, argument boxing, and security checks. For hot paths use:

- **Compiled expression trees** (\`Expression.Lambda(...).Compile()\`)
- **Source generators** (compile-time codegen)
- **Cached delegates**

For one-off setup or rarely-called code, reflection is fine.`,
    },
    {
      id: 'l-rf-2',
      title: 'Custom Attributes',
      type: 'theory',
      xp: 15,
      theory: `# Attributes

An **attribute** is metadata you attach to a type, member, parameter, or assembly. Reflection reads it at runtime to drive behavior.

The BCL ships dozens: \`[Obsolete]\`, \`[Serializable]\`, \`[Required]\`, \`[Test]\`, \`[Route]\`, ...

## Built-in examples

\`\`\`csharp
[Obsolete("Use ConfigureAwait(false) directly")]
public Task DoWork() => ...;

[Serializable]
public class State { ... }
\`\`\`

## Defining your own

\`\`\`csharp
[AttributeUsage(AttributeTargets.Class)]
public class TableAttribute : Attribute
{
    public string Name { get; }
    public TableAttribute(string name) => Name = name;
}

[Table("orders")]
public class Order { }
\`\`\`

By convention attribute classes end in \`Attribute\` but you can omit the suffix when applying them: \`[Table("orders")]\` works.

## Reading via reflection

\`\`\`csharp
TableAttribute t = typeof(Order).GetCustomAttribute<TableAttribute>();
Console.WriteLine(t?.Name);   // "orders"
\`\`\`

## When attributes shine

- Mapping classes to a database, JSON shape, or config schema (\`[Column]\`, \`[JsonPropertyName]\`)
- Marking tests, fixtures (\`[Fact]\`, \`[Theory]\`)
- Routing in web frameworks (\`[Route("/api/users/{id}")]\`)
- Validation (\`[Required]\`, \`[Range(0, 100)]\`)

The pattern: attribute = declaration; framework = inspector that reads them.

## AttributeUsage

Limits where the attribute can appear:

\`\`\`csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = false)]
\`\`\``,
    },
    {
      id: 'l-rf-3',
      title: 'Practice: Inspect a Type',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'A class `Calculator` with three methods is defined for you. Use reflection to print every **public instance method** name (skip property getters with `!m.IsSpecialName`), sorted alphabetically.\n\nExpected output:\n```\nAdd\nMultiply\nSubtract\n```',
        starterCode: `using System;
using System.Linq;
using System.Reflection;

public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Subtract(int a, int b) => a - b;
    public int Multiply(int a, int b) => a * b;
}

class Program
{
    static void Main()
    {
        Type t = typeof(Calculator);
        // Get public instance methods, skip getters/setters (m.IsSpecialName),
        // skip inherited Object methods (DeclaringType filter), sort, print

    }
}
`,
        solution: `using System;
using System.Linq;
using System.Reflection;

public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Subtract(int a, int b) => a - b;
    public int Multiply(int a, int b) => a * b;
}

class Program
{
    static void Main()
    {
        Type t = typeof(Calculator);
        var names = t.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly)
            .Where(m => !m.IsSpecialName)
            .Select(m => m.Name)
            .OrderBy(n => n)
            .ToArray();
        foreach (var n in names) Console.WriteLine(n);
    }
}`,
        tests: [
          { expectedOutput: 'Add\nMultiply\nSubtract', description: 'Sorted method names' },
        ],
        hints: [
          'BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly excludes inherited Object methods',
          'Filter out property accessors with `!m.IsSpecialName`',
          'OrderBy(n => n) for alphabetical order',
        ],
      },
    },
    {
      id: 'l-rf-4',
      title: 'Custom Attribute Demo',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Define a custom attribute `[Description("text")]`. Apply it to a class `Widget`. Then in `Main`, use reflection to read the attribute and print its text.\n\nExpected output:\n```\nA small reusable component\n```',
        starterCode: `using System;
using System.Reflection;

[AttributeUsage(AttributeTargets.Class)]
public class DescriptionAttribute : Attribute
{
    // Add a Text property and a constructor
}

[Description("A small reusable component")]
class Widget { }

class Program
{
    static void Main()
    {
        // Read DescriptionAttribute off Widget and print the Text

    }
}
`,
        solution: `using System;
using System.Reflection;

[AttributeUsage(AttributeTargets.Class)]
public class DescriptionAttribute : Attribute
{
    public string Text { get; }
    public DescriptionAttribute(string text) { Text = text; }
}

[Description("A small reusable component")]
class Widget { }

class Program
{
    static void Main()
    {
        var attr = (DescriptionAttribute)Attribute.GetCustomAttribute(typeof(Widget), typeof(DescriptionAttribute));
        Console.WriteLine(attr.Text);
    }
}`,
        tests: [{ expectedOutput: 'A small reusable component', description: 'Custom attribute round-trip' }],
        hints: [
          'Add `public string Text { get; }` and a constructor that sets it',
          'Use `Attribute.GetCustomAttribute(typeof(Widget), typeof(DescriptionAttribute))` and cast',
        ],
      },
    },
    {
      id: 'l-rf-5',
      title: 'Reflection Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does reflection happen?',
          options: ['Compile time', 'Runtime', 'Build time', 'Install time'],
          correctIndex: 1,
          explanation: 'Reflection inspects metadata at runtime. It\'s how serializers and DI containers work with types they\'ve never seen before.',
        },
        {
          question: 'What does `[Obsolete("...")]` do?',
          options: [
            'Removes the method at runtime',
            'Causes a compile-time warning when the marked member is used',
            'Speeds up compilation',
            'Marks the method as private',
          ],
          correctIndex: 1,
          explanation: 'Obsolete attribute makes the compiler warn (or error, with isError=true) on every usage. Lets you deprecate APIs without breaking callers immediately.',
        },
        {
          question: 'Why is reflection slower than direct calls?',
          options: [
            'It runs on a background thread',
            'It performs metadata lookup, security checks, and boxing per call',
            'It logs to disk',
            'It re-compiles every time',
          ],
          correctIndex: 1,
          explanation: 'Each Invoke does dynamic resolution. For hot paths, cache the MethodInfo or compile a delegate once.',
        },
        {
          question: 'Which is the right tool for compile-time type metadata processing in modern .NET?',
          options: ['Reflection', 'Source generators', 'XML comments', 'Build events'],
          correctIndex: 1,
          explanation: 'Source generators run during the compile and emit code. They\'re the modern replacement for reflection in scenarios where runtime cost matters (System.Text.Json, LoggerMessage, etc.).',
        },
      ],
    },
  ],
};

const chRecords: Chapter = {
  id: 'ch-records',
  title: 'Modern C# Syntax',
  description: 'Records, init, top-level statements, primary constructors',
  icon: '🪪',
  lessons: [
    {
      id: 'l-rec-1',
      title: 'Records (C# 9+)',
      type: 'theory',
      xp: 20,
      theory: `# Records

A \`record\` is a class (or struct) whose primary purpose is to hold **data** rather than behavior. C# 9 introduced them; they're now everywhere in modern code.

## The big win

A record gets a bunch of useful behavior **for free**:

- Value-based equality (two records with equal fields are equal)
- A nice ToString
- A \`with\`-expression for non-destructive copying
- Deconstruction
- Compatible with \`init\` setters

\`\`\`csharp
public record Person(string Name, int Age);

var a = new Person("Alice", 30);
var b = new Person("Alice", 30);

Console.WriteLine(a == b);                   // true (value equality)
Console.WriteLine(a);                         // Person { Name = Alice, Age = 30 }

var c = a with { Age = 31 };                  // copy with one field changed
\`\`\`

## class equivalent

Without records this would be:

\`\`\`csharp
public class Person : IEquatable<Person>
{
    public string Name { get; init; }
    public int Age { get; init; }
    public Person(string name, int age) { Name = name; Age = age; }
    public bool Equals(Person other) =>
        other != null && Name == other.Name && Age == other.Age;
    public override int GetHashCode() => HashCode.Combine(Name, Age);
    public override string ToString() => $"Person {{ Name = {Name}, Age = {Age} }}";
    // and you still wouldn't have \`with\`
}
\`\`\`

## When to use records vs classes

- **Records**: DTOs, value objects, immutable data, query results, events
- **Classes**: business objects with behavior, mutable state, identity that's NOT determined by content (e.g. an Order has an Id even when contents change)

## init-only setters

The \`init\` keyword lets a property be set during object initialization but immutable afterward:

\`\`\`csharp
public class Point
{
    public int X { get; init; }
    public int Y { get; init; }
}

var p = new Point { X = 1, Y = 2 };   // OK
// p.X = 3;                            // error — init-only
\`\`\`

Records use init-only by default.`,
    },
    {
      id: 'l-rec-2-code',
      title: 'Practice: Define a Record',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Define a positional `record Book(string Title, string Author, int Year)` at the top level. `Main()` already creates two books and prints whether they\'re equal, then makes a copy of one with `with` (changing Year) and prints that.\n\nExpected output:\n```\nTrue\nBook { Title = Clean Code, Author = Robert Martin, Year = 2009 }\n```',
        starterCode: `using System;

// Define a record Book(...) here

class Program
{
    static void Main()
    {
        var a = new Book("Clean Code", "Robert Martin", 2008);
        var b = new Book("Clean Code", "Robert Martin", 2008);
        Console.WriteLine(a == b);
        var c = a with { Year = 2009 };
        Console.WriteLine(c);
    }
}
`,
        solution: `using System;

public record Book(string Title, string Author, int Year);

class Program
{
    static void Main()
    {
        var a = new Book("Clean Code", "Robert Martin", 2008);
        var b = new Book("Clean Code", "Robert Martin", 2008);
        Console.WriteLine(a == b);
        var c = a with { Year = 2009 };
        Console.WriteLine(c);
    }
}`,
        tests: [{ expectedOutput: 'True\nBook { Title = Clean Code, Author = Robert Martin, Year = 2009 }', description: 'Value equality + with-expression' }],
        hints: [
          'A positional record is one line: `public record Book(string Title, string Author, int Year);`',
          'The `with` expression returns a new record — the original `a` is unchanged',
          'The auto-generated ToString puts braces around `Title = ..., Author = ..., Year = ...`',
        ],
      },
    },
    {
      id: 'l-rec-3-init',
      title: 'Practice: init-only setters',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Define a `class Point` with `int X` and `int Y` as **init-only** properties. `Main()` creates a Point with object-initializer syntax and prints `(X,Y)`.\n\nExpected output:\n```\n(3,4)\n```',
        starterCode: `using System;

// Define class Point with init-only X and Y

class Program
{
    static void Main()
    {
        var p = new Point { X = 3, Y = 4 };
        Console.WriteLine($"({p.X},{p.Y})");
    }
}
`,
        solution: `using System;

class Point
{
    public int X { get; init; }
    public int Y { get; init; }
}

class Program
{
    static void Main()
    {
        var p = new Point { X = 3, Y = 4 };
        Console.WriteLine($"({p.X},{p.Y})");
    }
}`,
        tests: [{ expectedOutput: '(3,4)', description: 'init-only props set via object initializer' }],
        hints: [
          'Auto-property syntax with `init` instead of `set`: `public int X { get; init; }`',
          'No constructor needed — the object initializer fills the values',
          'Try adding `p.X = 99;` after the construction. The compiler will reject it.',
        ],
      },
    },
    {
      id: 'l-rec-4-toplevel',
      title: 'Top-level statements (C# 9+)',
      type: 'theory',
      xp: 15,
      theory: `# Top-level statements

C# 9 introduced **top-level statements**: a single \`.cs\` file can have statements at the top, no \`class Program\` or \`static void Main\` boilerplate. The compiler synthesizes the \`Main\` for you.

\`\`\`csharp
using System;

Console.WriteLine("Hello, world!");
\`\`\`

That's a complete program. The trade-off:

- **Pro**: less ceremony for tiny programs, scripts, samples. Modern .NET templates use this for the \`Program.cs\` file.
- **Con**: you can have **at most one** file with top-level statements per project (the entry point). For libraries and bigger apps, regular \`class\` declarations still rule.

## What about types and methods?

You can declare types and methods after the top-level statements:

\`\`\`csharp
using System;

var p = new Person("Alex", 30);
Console.WriteLine(Greet(p));

string Greet(Person who) => $"Hello, {who.Name}!";

record Person(string Name, int Age);
\`\`\`

The order is: usings → top-level statements → local functions → type declarations.

## When to use it

- **Yes**: \`Program.cs\` of new console apps, demo files, tiny scripts.
- **No**: production codebases where you want explicit \`Main\`, multiple entry points, or to be consistent with the rest of your team.

This learning platform's lessons mostly stick with explicit \`class Program { static void Main() }\` because it makes lesson scope explicit. But you'll see top-level statements everywhere in real-world templates.`,
    },
    {
      id: 'l-rec-5-toplevel-code',
      title: 'Practice: Top-level statements',
      type: 'code',
      xp: 25,
      codeExercise: {
        instructions: 'Write a complete C# program using **top-level statements** (no `class Program`, no `static void Main`). The program should print three lines:\n```\nHello\nWorld\n42\n```\n\nIf you\'re curious, declare a local function `int Answer()` returning 42 and call it on the third line.',
        starterCode: `using System;

// No class, no Main — just statements.
// Console.WriteLine(...) here

`,
        solution: `using System;

Console.WriteLine("Hello");
Console.WriteLine("World");
Console.WriteLine(Answer());

int Answer() => 42;`,
        tests: [{ expectedOutput: 'Hello\nWorld\n42', description: 'Three lines via top-level statements' }],
        hints: [
          'No `class Program` needed — just `Console.WriteLine(...);` directly',
          'Local functions can be declared after the statements',
          'Local function: `int Answer() => 42;`',
        ],
      },
    },
    {
      id: 'l-rec-6-primary-ctor',
      title: 'Primary constructors (C# 12)',
      type: 'theory',
      xp: 20,
      theory: `# Primary constructors

C# 12 (Nov 2023) brought **primary constructors** to regular classes and structs. Records have had them since C# 9. The shorthand:

\`\`\`csharp
class Person(string name, int age)
{
    public string Display() => $"{name} ({age})";
}
\`\`\`

The parameters \`name\` and \`age\` are in scope for the **entire class body**. They behave like instance fields, but you don't have to write them out:

\`\`\`csharp
// Without primary ctor:
class Person
{
    private readonly string _name;
    private readonly int _age;
    public Person(string name, int age) { _name = name; _age = age; }
    public string Display() => $"{_name} ({_age})";
}
\`\`\`

## Public vs private

By default, primary-ctor parameters are NOT public. To expose them:

\`\`\`csharp
class Person(string name, int age)
{
    public string Name => name;        // expression-bodied property
    public int Age { get; } = age;     // auto-property with init from param
}
\`\`\`

Or just use a record if "public" is what you want.

## When to use it

- **Yes**: small classes that take a few dependencies (DI candidates), value-ish types you don't want to make full records.
- **Caution**: overuse can hide what's a parameter vs a field. Some teams treat primary ctors only as a transition step toward records.

## Records still have primary ctors

\`\`\`csharp
public record Point(int X, int Y);   // unchanged: positional record
\`\`\`

The C# 12 change is that **classes and structs** can use the same syntax now.`,
    },
    {
      id: 'l-rec-7-primary-ctor-code',
      title: 'Practice: Primary constructor on a class',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Define a `class Greeter(string name)` using a primary constructor, with one method `Hello()` that returns `"Hello, <name>!"`. `Main()` already calls it.\n\nExpected output:\n```\nHello, Alex!\n```',
        starterCode: `using System;

// Define class Greeter using a primary constructor

class Program
{
    static void Main()
    {
        var g = new Greeter("Alex");
        Console.WriteLine(g.Hello());
    }
}
`,
        solution: `using System;

class Greeter(string name)
{
    public string Hello() => $"Hello, {name}!";
}

class Program
{
    static void Main()
    {
        var g = new Greeter("Alex");
        Console.WriteLine(g.Hello());
    }
}`,
        tests: [{ expectedOutput: 'Hello, Alex!', description: 'Primary ctor + method using its parameter' }],
        hints: [
          'Class signature is `class Greeter(string name)` — parameters in parens after the class name',
          '`name` is in scope inside any method body',
          '`Hello()` can be expression-bodied: `=> $"Hello, {name}!";`',
        ],
      },
    },
    {
      id: 'l-rec-2',
      title: 'Records Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Two `record Person(string Name, int Age)` instances with the same Name and Age compare as...',
          options: ['Different (reference equality)', 'Equal (value equality)', 'Compile error', 'Always false'],
          correctIndex: 1,
          explanation: 'Records get value-based Equals/GetHashCode by default. Two records of the same shape with equal members are considered equal.',
        },
        {
          question: 'What does `var b = a with { Age = 31 };` do?',
          options: [
            'Mutates a in place',
            'Creates a copy of a with Age set to 31, leaving a unchanged',
            'Compiler error',
            'Moves a into b',
          ],
          correctIndex: 1,
          explanation: 'The with-expression is non-destructive: it returns a new record that\'s a copy except for the specified fields.',
        },
        {
          question: 'When should you prefer a class over a record?',
          options: [
            'Always — records are slow',
            'When the type has identity that doesn\'t come from its data, or significant behavior',
            'For DTOs',
            'When you need value equality',
          ],
          correctIndex: 1,
          explanation: 'Records lean toward immutable, value-equal data. Use a class for stateful business objects with behavior, or things with an Id that survives mutation.',
        },
        {
          question: 'What does `init` in `public int X { get; init; }` mean?',
          options: [
            'Initialize on first use',
            'Settable only during object initialization, immutable afterward',
            'Static',
            'Required',
          ],
          correctIndex: 1,
          explanation: 'init-only setters allow object-initializer assignment but block later writes. Great for immutable-by-default types.',
        },
        {
          question: 'In `class Greeter(string name)`, what is `name`?',
          options: [
            'A public property',
            'A primary-constructor parameter, in scope for the entire class body',
            'A private field you must declare separately',
            'A static field',
          ],
          correctIndex: 1,
          explanation: 'Primary-ctor parameters are scoped to the class body. They\'re NOT public properties by default — expose them via `public string Name => name;` or similar.',
        },
        {
          question: 'A program with top-level statements...',
          options: [
            'Can have multiple files with top-level statements',
            'Must still declare `class Program`',
            'Synthesizes Main for you; only one such file is allowed per project',
            'Cannot use any types',
          ],
          correctIndex: 2,
          explanation: 'The compiler creates a hidden Main containing your top-level statements. Only one file per project can do this — the entry point.',
        },
      ],
    },
  ],
};

const chVariance: Chapter = {
  id: 'ch-variance',
  title: 'Covariance & Contravariance',
  description: 'When IEnumerable<Cat> is an IEnumerable<Animal>',
  icon: '↔️',
  lessons: [
    {
      id: 'l-var-1',
      title: 'Covariance with `out`',
      type: 'theory',
      xp: 15,
      theory: `# Variance

**Variance** answers: if \`Cat\` derives from \`Animal\`, is \`IEnumerable<Cat>\` also an \`IEnumerable<Animal>\`?

For most generics, the answer is **no** — \`List<Cat>\` is not a \`List<Animal>\`. But specific interfaces opt in.

## Covariance — \`out T\`

\`\`\`csharp
class Animal { }
class Cat : Animal { }

IEnumerable<Cat> cats = new List<Cat>();
IEnumerable<Animal> animals = cats;   // OK!
\`\`\`

This works because \`IEnumerable<T>\` is declared as \`IEnumerable<out T>\`. The \`out\` keyword on a generic parameter marks T as **covariant**: the type can be **substituted with a more derived type** in *output positions* (returns, getters).

The intuition: every Cat is an Animal, so a sequence of Cats is safe to iterate as a sequence of Animals.

## Where it shows up

- \`IEnumerable<out T>\`
- \`IReadOnlyList<out T>\`, \`IReadOnlyCollection<out T>\`
- \`Func<out TResult>\` (return type is output)

## Why \`List<T>\` is NOT covariant

\`\`\`csharp
List<Cat> cats = new();
List<Animal> a = cats;      // ERROR
a.Add(new Dog());           // -- if it compiled, this would corrupt cats
\`\`\`

\`List<T>\` lets you both read AND write T, so making it covariant would let you put a Dog into a List<Cat>. Lists are **invariant** for that reason.`,
    },
    {
      id: 'l-var-2',
      title: 'Contravariance with `in`',
      type: 'theory',
      xp: 15,
      theory: `# Contravariance — \`in T\`

The flip side. \`IComparer<in T>\` is contravariant.

\`\`\`csharp
IComparer<Animal> animalComparer = ...;
IComparer<Cat> catComparer = animalComparer;   // OK!
\`\`\`

The intuition: a comparer that knows how to compare any two Animals can certainly compare two Cats — Cats *are* Animals.

\`in\` means T is used in **input positions** only (parameters, setters). The type can be substituted with a **less derived** type.

## Common contravariant types

- \`IComparer<in T>\`
- \`Action<in T>\`, \`Action<in T1, in T2, ...>\`
- \`IEqualityComparer<in T>\`
- \`Predicate<in T>\`

## Func combines both

\`\`\`csharp
public delegate TResult Func<in T, out TResult>(T arg);
\`\`\`

T is contravariant (input), TResult is covariant (output). So \`Func<Animal, Cat>\` is assignable to \`Func<Cat, Animal>\`.

## Cheat sheet

| You want... | Use |
|---|---|
| Treat \`X<Cat>\` as \`X<Animal>\` (substitution toward base) | \`out T\` (covariance) |
| Treat \`X<Animal>\` as \`X<Cat>\` (substitution toward derived) | \`in T\` (contravariance) |
| Read AND write T | invariant (default) |

## When this comes up in real code

You'll mostly **consume** variance, not declare it: passing a \`List<Cat>\` to a method expecting \`IEnumerable<Animal>\`, or assigning an \`Action<object>\` to an \`Action<string>\`. When designing your own interfaces with a single direction of T, opt in with \`in\`/\`out\` so callers benefit.`,
    },
    {
      id: 'l-var-3',
      title: 'Variance Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why is `IEnumerable<Cat>` assignable to `IEnumerable<Animal>`?',
          options: [
            'They\'re unrelated, the cast fails',
            'IEnumerable<out T> is covariant — outputs only, safe to widen the element type',
            'List<T> handles the conversion',
            'It\'s only allowed in C# 12+',
          ],
          correctIndex: 1,
          explanation: 'The `out T` declaration on IEnumerable<T> opts into covariance. T is in output positions (yielded values), so widening to a base type is safe.',
        },
        {
          question: 'Why is `List<T>` invariant?',
          options: [
            'Lists are slow with variance',
            'Add(T) takes T as input — covariance would let you Add a wrong derived type',
            'It\'s not — List<Cat> IS a List<Animal>',
            'It uses arrays internally',
          ],
          correctIndex: 1,
          explanation: 'List<T> reads AND writes T. Allowing covariance would let you Add a Dog into a List<Cat>, breaking type safety.',
        },
        {
          question: 'Which keyword marks a contravariant generic parameter?',
          options: ['out', 'in', 'ref', 'where'],
          correctIndex: 1,
          explanation: '`in` means the parameter is used only as input. The type can be substituted with a less-derived (more general) type.',
        },
        {
          question: '`Action<Animal> a = ...; Action<Cat> c = a;` is...',
          options: [
            'Compile error',
            'Valid — Action is contravariant in T',
            'Valid only at runtime',
            'Valid only when Cat is sealed',
          ],
          correctIndex: 1,
          explanation: 'Action<in T> is contravariant. An action that handles any Animal can certainly handle a Cat.',
        },
      ],
    },
  ],
};

const chConfig: Chapter = {
  id: 'ch-config',
  title: 'Configuration & Options',
  description: 'appsettings.json, env vars, IConfiguration',
  icon: '⚙️',
  lessons: [
    {
      id: 'l-cfg-1',
      title: 'appsettings.json & IConfiguration',
      type: 'theory',
      xp: 20,
      theory: `# Configuration in modern .NET

Modern .NET apps centralize configuration in **\`IConfiguration\`** — a unified API that reads settings from many sources and merges them.

## Default sources (in order of priority — later overrides earlier)

1. \`appsettings.json\`
2. \`appsettings.{Environment}.json\` (Development, Staging, Production, ...)
3. User secrets (in Development only)
4. Environment variables
5. Command-line arguments

The Generic Host wires all these up automatically. You don't need to call them by hand.

## A typical appsettings.json

\`\`\`json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=app;..."
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Mail": {
    "Server": "smtp.example.com",
    "Port": 587,
    "FromAddress": "noreply@example.com"
  }
}
\`\`\`

## Reading values

\`\`\`csharp
public class HomeController : Controller
{
    private readonly IConfiguration _config;
    public HomeController(IConfiguration config) => _config = config;

    public IActionResult Index()
    {
        string conn = _config["ConnectionStrings:Default"];   // colon for nesting
        string mail = _config.GetSection("Mail")["Server"];
        int port = _config.GetValue<int>("Mail:Port");
        return View();
    }
}
\`\`\`

The colon \`:\` traverses nested sections.

## Override at runtime

Environment variables use a double-underscore for nesting (since most shells dislike \`:\`):

\`\`\`bash
export Mail__Server=smtp.real-host.com
dotnet run
\`\`\`

Or in Docker:

\`\`\`dockerfile
ENV Mail__Server=smtp.real-host.com
\`\`\`

## Per-environment files

\`appsettings.Production.json\` overrides \`appsettings.json\` when \`ASPNETCORE_ENVIRONMENT=Production\`. Common pattern:

- \`appsettings.json\` — checked in, contains defaults
- \`appsettings.Development.json\` — checked in, dev-only overrides
- \`appsettings.Production.json\` — checked in if non-secret, otherwise injected via env vars

**Never commit secrets.** Use User Secrets locally and a vault (Azure Key Vault, AWS Secrets Manager, ...) in prod.`,
    },
    {
      id: 'l-cfg-2',
      title: 'The Options Pattern',
      type: 'theory',
      xp: 20,
      theory: `# IOptions<T>

Reading config keys with strings (\`_config["Mail:Server"]\`) is fine for small apps but doesn't scale. The **options pattern** binds a section of config to a strongly-typed POCO.

## Step 1 — define a class

\`\`\`csharp
public class MailOptions
{
    public string Server { get; set; } = "";
    public int Port { get; set; }
    public string FromAddress { get; set; } = "";
}
\`\`\`

## Step 2 — register it

\`\`\`csharp
builder.Services.Configure<MailOptions>(
    builder.Configuration.GetSection("Mail"));
\`\`\`

That binds the JSON section to \`MailOptions\` whenever someone asks for one via DI.

## Step 3 — consume it

\`\`\`csharp
public class EmailService
{
    private readonly MailOptions _opts;

    public EmailService(IOptions<MailOptions> opts)
    {
        _opts = opts.Value;
    }

    public void Send(string to, string body)
    {
        var smtp = new SmtpClient(_opts.Server, _opts.Port);
        smtp.Send(_opts.FromAddress, to, "subject", body);
    }
}
\`\`\`

## Three flavors

| Interface | When values can change |
|---|---|
| \`IOptions<T>\` | Captured once at app start — never changes |
| \`IOptionsSnapshot<T>\` | Re-read per request (only in scoped contexts like web requests) |
| \`IOptionsMonitor<T>\` | Real-time, with change notifications |

For most code, \`IOptions<T>\` is fine.

## Validation

\`\`\`csharp
builder.Services
    .AddOptions<MailOptions>()
    .Bind(builder.Configuration.GetSection("Mail"))
    .Validate(o => o.Port > 0 && o.Port < 65536, "Port must be 1-65535")
    .ValidateOnStart();
\`\`\`

\`ValidateOnStart\` fails the app at boot if config is bad — far better than a mystery failure at first email send.

## Why bother

- **Type safety** — typo in a key is a compile error, not a runtime null
- **Discoverability** — IDE autocomplete shows the available keys
- **Testability** — pass any \`MailOptions\` instance in unit tests, no fake config provider needed`,
    },
    {
      id: 'l-cfg-3',
      title: 'Secrets & environments',
      type: 'theory',
      xp: 15,
      theory: `# Secrets and environments

The cardinal rule: **never commit secrets**. Connection strings with passwords, API keys, OAuth client secrets — all kryptonite if leaked.

## User Secrets (development only)

\`\`\`bash
dotnet user-secrets init
dotnet user-secrets set "Mail:ApiKey" "sk_test_xxx"
\`\`\`

User Secrets store values in a JSON file outside the repo (\`~/.microsoft/usersecrets/<id>/secrets.json\` on \\*nix). The Generic Host auto-loads them in Development environment.

## Environment variables (any environment)

\`\`\`bash
export Mail__ApiKey=sk_live_xxx
dotnet run
\`\`\`

Use double-underscore for nesting; .NET's environment provider translates them to \`Mail:ApiKey\`.

## Cloud secret stores

Production should pull from a secret manager:

- **Azure Key Vault** — \`AddAzureKeyVault(...)\` extension
- **AWS Secrets Manager** — third-party providers
- **HashiCorp Vault** — same
- **Doppler / 1Password / Bitwarden** — same

These plug into IConfiguration like any other source — your app just reads via \`IConfiguration\` or \`IOptions<T>\`.

## Setting the environment

The host reads \`ASPNETCORE_ENVIRONMENT\` (web) or \`DOTNET_ENVIRONMENT\` (anything) to decide which \`appsettings.{Env}.json\` to load.

\`\`\`bash
ASPNETCORE_ENVIRONMENT=Production dotnet run
\`\`\`

Or in Docker:

\`\`\`dockerfile
ENV ASPNETCORE_ENVIRONMENT=Production
\`\`\`

The convention is "Development", "Staging", "Production" — but you can use any string. \`builder.Environment.IsDevelopment()\` etc. are convenience checks.

## launchSettings.json — for local development

\`\`\`json
{
  "profiles": {
    "MyApp": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "Mail__Server": "smtp.mailtrap.io"
      }
    }
  }
}
\`\`\`

This file is for *your machine* and should NOT be relied on in CI/CD. It lives in \`Properties/\` and is read only when launching locally via \`dotnet run\` or your IDE.`,
    },
    {
      id: 'l-cfg-4',
      title: 'Configuration Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which order is the default IConfiguration source priority (later wins)?',
          options: [
            'Environment variables → appsettings.json',
            'appsettings.json → appsettings.Environment.json → user secrets → env vars → command line',
            'Random per-app',
            'Only appsettings.json is read by default',
          ],
          correctIndex: 1,
          explanation: 'Generic Host wires up sources in that order. Later sources override earlier ones — so command-line args beat env vars beat user secrets beat appsettings.',
        },
        {
          question: 'Why prefer `IOptions<MailOptions>` over `IConfiguration["Mail:Server"]`?',
          options: [
            'IOptions is faster',
            'Type safety, IDE autocomplete, easier unit testing',
            'IConfiguration is deprecated',
            'IOptions is the only way to read config',
          ],
          correctIndex: 1,
          explanation: 'Strongly-typed options stop typos at compile, document the schema, and let tests pass any POCO instance.',
        },
        {
          question: 'How do you nest config keys when setting an environment variable?',
          options: [
            'Mail:Server',
            'Mail.Server',
            'Mail__Server (double underscore)',
            'Mail-Server',
          ],
          correctIndex: 2,
          explanation: 'Most shells reject the colon. Double-underscore is .NET\'s standard substitute that the env-var provider translates back to nested sections.',
        },
        {
          question: 'Which option flavor is best when you want config changes to apply mid-request?',
          options: ['IOptions<T>', 'IOptionsSnapshot<T>', 'IOptionsMonitor<T>', 'IConfiguration'],
          correctIndex: 1,
          explanation: 'IOptionsSnapshot rebinds per request scope. IOptionsMonitor adds change notifications. IOptions is one-shot at app start.',
        },
      ],
    },
  ],
};

const chLogging: Chapter = {
  id: 'ch-logging',
  title: 'Logging with ILogger<T>',
  description: 'Structured, level-aware, provider-agnostic',
  icon: '📝',
  lessons: [
    {
      id: 'l-lg-1',
      title: 'ILogger basics',
      type: 'theory',
      xp: 20,
      theory: `# ILogger<T>

The .NET logging abstraction is \`ILogger<T>\` — request it via DI and the framework decides which providers process the messages.

## Inject it

\`\`\`csharp
public class OrderService
{
    private readonly ILogger<OrderService> _log;

    public OrderService(ILogger<OrderService> log)
    {
        _log = log;
    }

    public void Submit(Order o)
    {
        _log.LogInformation("Submitting order {OrderId} for customer {CustomerId}", o.Id, o.CustomerId);
        try
        {
            // ...
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Failed to submit order {OrderId}", o.Id);
            throw;
        }
    }
}
\`\`\`

The \`<T>\` is **only** used as a category string ("OrderService" in this case). You can filter by category in config.

## Six levels (low → high)

| Level | When |
|---|---|
| \`Trace\` | Very chatty, tracing internal flow |
| \`Debug\` | Diagnostic info during development |
| \`Information\` | Normal operations (request started, order placed) |
| \`Warning\` | Unexpected but recoverable (slow query, retry) |
| \`Error\` | A specific operation failed |
| \`Critical\` | The whole app may be at risk (DB down) |

Setting "minimum level = Information" means Trace/Debug are dropped before formatting (cheap).

## Configure levels in appsettings.json

\`\`\`json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "MyApp.Internal": "Debug"
    }
  }
}
\`\`\`

You can dial verbosity per category — quiet down the framework, crank up your own code.`,
    },
    {
      id: 'l-lg-2',
      title: 'Structured logging',
      type: 'theory',
      xp: 15,
      theory: `# Structured logging

This is the most important habit to learn:

\`\`\`csharp
// BAD — unstructured
_log.LogInformation($"User {userId} placed order {orderId}");

// GOOD — structured
_log.LogInformation("User {UserId} placed order {OrderId}", userId, orderId);
\`\`\`

Both look the same in console output. The difference is in **searchable log stores** (Seq, Elasticsearch, Datadog, Splunk).

The structured form preserves \`UserId\` and \`OrderId\` as distinct fields — you can query "all logs where UserId = 42" without regex.

The unstructured form just produces a string — searching it requires \`grep\`-style tricks.

## Property names

Use **PascalCase** to match the convention. The placeholder name in the template becomes the property name.

\`\`\`csharp
_log.LogInformation("Processed {Count} items in {ElapsedMs}ms", n, sw.ElapsedMilliseconds);
\`\`\`

## Capturing exceptions

\`\`\`csharp
try { ... }
catch (Exception ex)
{
    _log.LogError(ex, "Sync failed for tenant {TenantId}", tenantId);
}
\`\`\`

The exception goes to the **first** parameter; the message follows. Providers serialize the full stack trace.

## Scopes

Group related log lines with a scope:

\`\`\`csharp
using (_log.BeginScope("RequestId={RequestId}", request.Id))
{
    _log.LogInformation("Processing");
    DoWork();
    _log.LogInformation("Done");
}
\`\`\`

Every line inside the using block carries \`RequestId\` automatically. Aggregators index it as a property.

## High-perf logging

For hot loops, the compiler can generate zero-allocation log methods via the \`LoggerMessage\` source generator:

\`\`\`csharp
[LoggerMessage(EventId = 1001, Level = LogLevel.Information,
    Message = "Got {Count} rows from {Table}")]
public static partial void GotRows(this ILogger log, int count, string table);
\`\`\`

The method does no boxing or string formatting unless a provider is actually consuming that level. Worth it in code that runs millions of times per second.`,
    },
    {
      id: 'l-lg-3',
      title: 'Logging Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why use `ILogger<T>` instead of `ILogger`?',
          options: [
            'Performance',
            'The generic parameter sets the log category, used for per-class filtering',
            'Required for DI to work',
            'Stylistic only',
          ],
          correctIndex: 1,
          explanation: 'The class name becomes the category string. You can configure log levels per category in appsettings.',
        },
        {
          question: 'What\'s the structured-logging difference?',
          options: [
            'No difference — both produce the same output',
            'Structured preserves placeholder values as named fields, queryable in log stores',
            'Structured is JSON-only',
            'Structured uses less memory',
          ],
          correctIndex: 1,
          explanation: 'Structured logging keeps the variables as separate fields. Stores like Seq/Elasticsearch index them so you can query "where UserId=42".',
        },
        {
          question: 'Where does the Exception go in `_log.LogError(ex, "...", arg)`?',
          options: [
            'It must be in the message template',
            'First positional parameter, before the message',
            'Last positional parameter',
            'It can\'t be logged this way',
          ],
          correctIndex: 1,
          explanation: 'Convention: exception is the first arg, then template, then template arguments.',
        },
        {
          question: 'What does `_log.BeginScope(...)` do?',
          options: [
            'Starts a transaction',
            'Adds context properties to every log line written within the using block',
            'Suppresses logs',
            'Increases log level',
          ],
          correctIndex: 1,
          explanation: 'Scopes attach contextual properties (RequestId, UserId, etc.) to every log inside, helping you correlate related events.',
        },
      ],
    },
  ],
};

const chDI: Chapter = {
  id: 'ch-di',
  title: 'Dependency Injection',
  description: 'Wire types together at the edge',
  icon: '🧩',
  lessons: [
    {
      id: 'l-di-1',
      title: 'Why DI?',
      type: 'theory',
      xp: 20,
      theory: `# Dependency Injection

A class **depends on** the things it uses. DI is the practice of having those dependencies handed to you (usually via constructor parameters) rather than constructing them yourself.

## The without-DI problem

\`\`\`csharp
public class OrderService
{
    private readonly EmailClient _email = new EmailClient();
    private readonly Database _db = new Database("server=...;");

    public void Submit(Order o)
    {
        _db.Save(o);
        _email.Send(o.Customer, "Thanks");
    }
}
\`\`\`

Pain points:
- Cannot test without a real DB and a real SMTP server
- The connection string is hardcoded — different env = code change
- Every \`new EmailClient()\` is a separate connection — wasteful

## With DI

\`\`\`csharp
public class OrderService
{
    private readonly IEmailClient _email;
    private readonly IDatabase _db;

    public OrderService(IEmailClient email, IDatabase db)
    {
        _email = email;
        _db = db;
    }

    public void Submit(Order o)
    {
        _db.Save(o);
        _email.Send(o.Customer, "Thanks");
    }
}
\`\`\`

Now:
- Tests pass mocks: \`new OrderService(new FakeEmail(), new FakeDb())\`
- Production wires real implementations through a **container**
- The class doesn't know — and shouldn't — where those dependencies came from

## The container

In .NET the standard container is \`Microsoft.Extensions.DependencyInjection\` (MSDI). You register types up front; the container instantiates them on demand and injects them as needed.

\`\`\`csharp
var services = new ServiceCollection();
services.AddSingleton<IEmailClient, SmtpEmailClient>();
services.AddScoped<IDatabase, SqlDatabase>();
services.AddTransient<OrderService>();

var provider = services.BuildServiceProvider();
var orders = provider.GetRequiredService<OrderService>();
orders.Submit(o);
\`\`\`

The container saw that \`OrderService\` needs \`IEmailClient\` and \`IDatabase\`, fetched them, and constructed the service.`,
    },
    {
      id: 'l-di-2',
      title: 'Lifetimes',
      type: 'theory',
      xp: 20,
      theory: `# Service Lifetimes

When you register a service you choose how long an instance lives.

## Singleton

One instance for the entire app, shared across all callers.

\`\`\`csharp
services.AddSingleton<IClock, SystemClock>();
\`\`\`

Use for: stateless helpers, expensive-to-construct services, caches, configuration objects.
**Don't:** put per-request state in a singleton — it leaks between users.

## Scoped

One instance per **scope**. In an ASP.NET Core app, the scope is **the HTTP request** — every dependency in a single request gets the same instance.

\`\`\`csharp
services.AddScoped<IDatabase, SqlDatabase>();
\`\`\`

Use for: anything that should be consistent within a request — DB context, current user info, unit of work.

## Transient

A fresh instance every time someone asks.

\`\`\`csharp
services.AddTransient<IEmailFormatter, HtmlEmailFormatter>();
\`\`\`

Use for: lightweight stateless helpers where you don't care about reuse.

## The "captive dependency" trap

A **longer-lived** service must NOT inject a **shorter-lived** one:

\`\`\`csharp
// BAD
services.AddSingleton<UserCache>();    // singleton
services.AddScoped<IDatabase, SqlDb>(); // scoped

// UserCache.ctor takes IDatabase — captures the FIRST request's instance forever!
\`\`\`

The runtime warns about this in dev. The fix: depend on \`IServiceScopeFactory\` and create a scope when you need one inside a singleton.

## Cheat sheet

| Need | Use |
|---|---|
| App-wide stateless helper or config | Singleton |
| Per-request consistency (DB context, current user) | Scoped |
| Anything else, especially short-lived | Transient |`,
    },
    {
      id: 'l-di-3',
      title: 'Constructor injection patterns',
      type: 'theory',
      xp: 15,
      theory: `# Constructor injection — the right way

The .NET DI norm is **constructor injection**: dependencies arrive as ctor params, get assigned to readonly fields, and stay immutable.

\`\`\`csharp
public class OrderService
{
    private readonly IEmailClient _email;
    private readonly IDatabase _db;
    private readonly ILogger<OrderService> _log;

    public OrderService(IEmailClient email, IDatabase db, ILogger<OrderService> log)
    {
        _email = email;
        _db = db;
        _log = log;
    }
}
\`\`\`

Benefits:
- Dependencies are **explicit** in the ctor signature — no hidden requirements
- The class can't exist in a half-initialized state
- Tests construct with whatever stand-ins they want

## What NOT to do

- **Service locator pattern** — calling \`provider.GetService<X>()\` from inside business code. Hides dependencies, fights the container.
- **Property injection** — public settable properties that the container fills. Only use when you genuinely have an optional dependency that can change at runtime.
- **Many ctors** — pick one. Multi-ctor types confuse the container.

## Too many dependencies

If your ctor has 10 dependencies, the class is doing too much. Split it.

A common refactor: extract a "facade" or "orchestrator" class that depends on a couple of focused services, each of which has 1-3 dependencies.

## DI vs the New keyword

You don't have to put **everything** in the container. Plain data structures (\`Order\`, \`Customer\`, \`PriceQuote\`) are still constructed with \`new\`. Only **services** — things with behavior and dependencies — belong in DI.

## Common registration helpers

\`\`\`csharp
services.AddHttpClient();                       // pre-configured HttpClient factory
services.AddDbContext<AppDb>();                 // EF Core context
services.AddOptions<MailOptions>();             // strongly-typed options
services.AddHostedService<BackgroundWorker>();  // long-running service
services.AddMemoryCache();
services.AddAuthentication();
\`\`\`

Each library exposes its own AddXxx extensions to make registration discoverable.`,
    },
    {
      id: 'l-di-4',
      title: 'A registration cheat sheet',
      type: 'theory',
      xp: 15,
      theory: `# Registration patterns

A reference of the registration shapes you'll see in real codebases.

## Bind interface to implementation

\`\`\`csharp
services.AddScoped<IDatabase, SqlDatabase>();
\`\`\`

When someone asks for \`IDatabase\`, get a \`SqlDatabase\`. Per-scope.

## Bind a concrete type (no interface)

\`\`\`csharp
services.AddScoped<OrderService>();
\`\`\`

Sometimes you don't bother with an interface. The container resolves the concrete type directly.

## Lambda factory

When construction needs custom logic:

\`\`\`csharp
services.AddSingleton<IClock>(_ => new SystemClock(TimeZoneInfo.Utc));
services.AddScoped<IDb>(sp =>
{
    var conn = sp.GetRequiredService<IConfiguration>().GetConnectionString("Default");
    return new SqlDb(conn);
});
\`\`\`

The lambda receives \`IServiceProvider\` so you can pull other services.

## Existing instance

\`\`\`csharp
services.AddSingleton<IClock>(SystemClock.Instance);
\`\`\`

When you already have the object — handy for sharing across an app and for tests.

## Multiple impls of the same interface

\`\`\`csharp
services.AddScoped<INotifier, EmailNotifier>();
services.AddScoped<INotifier, SmsNotifier>();
services.AddScoped<INotifier, PushNotifier>();
\`\`\`

Then inject \`IEnumerable<INotifier>\` to get all three.

## Decorator pattern (manual)

The built-in container doesn't support decorators directly. Reach for **Scrutor** (3rd party):

\`\`\`csharp
services.AddScoped<IDatabase, SqlDatabase>();
services.Decorate<IDatabase, CachingDatabase>();   // wraps the registered impl
\`\`\`

## TryAdd vs Add

\`TryAddSingleton\` only registers if no other registration for that interface exists. Useful when writing libraries — you let the consumer override your default.

\`\`\`csharp
services.TryAddSingleton<IClock, SystemClock>();
\`\`\``,
    },
    {
      id: 'l-di-5',
      title: 'DI Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the main benefit of injecting dependencies via the constructor instead of `new`-ing them?',
          options: [
            'Faster startup',
            'Tests can pass mocks; production wiring is centralized',
            'Less code',
            'Required by the runtime',
          ],
          correctIndex: 1,
          explanation: 'DI lets the class declare what it needs without dictating where it comes from. The composition root decides — and tests can pass anything.',
        },
        {
          question: 'Which lifetime gives one instance per HTTP request in ASP.NET Core?',
          options: ['Singleton', 'Scoped', 'Transient', 'Per-thread'],
          correctIndex: 1,
          explanation: 'Scoped is bound to the request scope in web. Outside of web, scopes are manual via IServiceScopeFactory.',
        },
        {
          question: 'A singleton injects a scoped service. What\'s wrong?',
          options: [
            'Nothing — that\'s fine',
            'Captive dependency — the singleton holds the first scoped instance forever',
            'Compile error',
            'Performance',
          ],
          correctIndex: 1,
          explanation: 'The singleton outlives every scope. Whichever scoped instance was around when the singleton was constructed gets captured permanently.',
        },
        {
          question: 'Which of these would NOT typically be in DI?',
          options: [
            'A logger',
            'A database service',
            'An Order data class',
            'A mail sender',
          ],
          correctIndex: 2,
          explanation: 'Plain data classes (POCOs / DTOs) are constructed with new where needed. Services — anything with behavior and dependencies — belong in the container.',
        },
      ],
    },
  ],
};

const chAspNet: Chapter = {
  id: 'ch-aspnet',
  title: 'ASP.NET Core Tour',
  description: 'Building web apps and APIs',
  icon: '🌐',
  lessons: [
    {
      id: 'l-aspn-1',
      title: 'What ASP.NET Core is',
      type: 'theory',
      xp: 20,
      theory: `# ASP.NET Core

ASP.NET Core is Microsoft's web framework: HTTP server, routing, middleware, content negotiation, all on top of the same Generic Host you saw earlier.

## Three flavors of HTTP app

| Style | What you build | When |
|---|---|---|
| **Minimal APIs** | Tiny endpoint registrations in \`Program.cs\` | Microservices, JSON APIs, Lambda-style functions |
| **MVC** | Controllers + Views (Razor) | Server-rendered HTML apps with structured codebases |
| **Razor Pages** | Page-based, Model + cshtml | Form-heavy apps; simpler than MVC for CRUD |

You can mix all three in one project.

## The minimal API

\`\`\`csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDb>();

var app = builder.Build();

app.MapGet("/", () => "Hello!");
app.MapGet("/users/{id:int}", async (int id, AppDb db) =>
    await db.Users.FindAsync(id) is User u ? Results.Ok(u) : Results.NotFound());

app.MapPost("/users", async (User u, AppDb db) =>
{
    db.Users.Add(u);
    await db.SaveChangesAsync();
    return Results.Created($"/users/{u.Id}", u);
});

app.Run();
\`\`\`

Every line above is real production-quality code. \`Program.cs\` IS the app — no generated cruft.

## Kestrel — the HTTP server

ASP.NET Core ships with **Kestrel**, a high-perf cross-platform HTTP server. It runs in your process. In production you usually:

- Front it with a reverse proxy (Nginx, IIS, Cloud LB) for TLS termination, request smoothing, etc.
- Or expose Kestrel directly via HTTP/2 + HTTP/3 — modern option, fewer hops

## Middleware pipeline

Every request walks through a configurable list of middleware before hitting your endpoint. Standard middleware: routing, auth, exception handling, response compression, CORS, ...`,
    },
    {
      id: 'l-aspn-2',
      title: 'Routing & Model Binding',
      type: 'theory',
      xp: 20,
      theory: `# Routing

The router maps an incoming HTTP method + path to your handler.

## Path templates

\`\`\`csharp
app.MapGet("/users/{id:int}", (int id) => ...);                    // /users/42
app.MapGet("/posts/{slug}", (string slug) => ...);                 // /posts/hello-world
app.MapGet("/files/{*path}", (string path) => ...);                // /files/a/b/c.txt
app.MapGet("/orders", (int? skip, int? take) => ...);              // /orders?skip=10&take=5
\`\`\`

Constraints (\`:int\`, \`:guid\`, \`:length(3,10)\`) reject mismatches **at routing time**, before your code runs.

## Model binding

Parameters get values from different parts of the request, automatically:

| Source | How it's picked |
|---|---|
| **Route values** | If the parameter name matches a route segment |
| **Query string** | Simple types not in the route |
| **Body** | Complex types in POST/PUT (deserialized as JSON) |
| **Headers** | When marked \`[FromHeader]\` |
| **Form** | \`IFormCollection\` or \`[FromForm]\` |

\`\`\`csharp
app.MapPost("/orders", (
    [FromBody] CreateOrderRequest req,        // JSON body
    [FromQuery] string? source,                // ?source=mobile
    [FromHeader(Name = "X-Tenant")] string tenant,
    HttpContext ctx) =>
{
    // ...
});
\`\`\`

## Validation

For endpoints that take a model, decorate the model with \`DataAnnotations\` attributes:

\`\`\`csharp
public record CreateOrderRequest(
    [Required] string CustomerName,
    [Range(1, 1000)] int Quantity,
    [EmailAddress] string Email
);
\`\`\`

In MVC, the framework validates and you check \`ModelState.IsValid\`. Minimal APIs need a tiny extra setup or a library like FluentValidation. .NET 8 added built-in validation for minimal APIs.

## Returning responses

\`\`\`csharp
return Results.Ok(user);                       // 200
return Results.Created($"/users/{id}", user);  // 201
return Results.NoContent();                    // 204
return Results.NotFound();                     // 404
return Results.BadRequest(new { error = "..."}); // 400
return Results.Problem("Internal trouble");    // 500 + ProblemDetails JSON
\`\`\`

Returning \`Results.X\` is the recommended pattern in minimal APIs.`,
    },
    {
      id: 'l-aspn-3',
      title: 'Middleware Pipeline',
      type: 'theory',
      xp: 20,
      theory: `# The middleware pipeline

Every HTTP request travels a chain of **middleware** before reaching your endpoint, then passes through them again on the way back. Each middleware can:

- Inspect / modify the request
- Hand off to the next middleware
- Short-circuit and write a response itself
- Inspect / modify the response on the way out

## Order matters

\`\`\`csharp
var app = builder.Build();

app.UseExceptionHandler("/error");      // catches throws downstream
app.UseHttpsRedirection();
app.UseStaticFiles();                   // serve wwwroot/
app.UseRouting();
app.UseAuthentication();                // who is the caller?
app.UseAuthorization();                 // are they allowed?
app.UseEndpoints(e => e.MapControllers());

app.Run();
\`\`\`

Move \`UseAuthentication\` after \`UseAuthorization\` and you've broken auth — Authorization runs against an empty user.

## Common built-in middleware

| Middleware | Job |
|---|---|
| \`UseExceptionHandler\` | Convert unhandled throws to HTTP error responses |
| \`UseStaticFiles\` | Serve files from \`wwwroot/\` directly |
| \`UseRouting\` / \`UseEndpoints\` | Match requests to routes |
| \`UseAuthentication\` | Identify the user (cookies, JWT, ...) |
| \`UseAuthorization\` | Enforce policies |
| \`UseCors\` | Cross-origin headers |
| \`UseRateLimiter\` | Throttle requests (.NET 7+) |
| \`UseResponseCompression\` | Gzip/Brotli responses |
| \`UseHsts\` | HTTPS enforcement headers |

## Writing your own

\`\`\`csharp
app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    await next();                                  // call downstream
    sw.Stop();
    ctx.Response.Headers["X-Elapsed-Ms"] = sw.ElapsedMilliseconds.ToString();
});
\`\`\`

This is a **request timer** middleware. Add it before \`UseEndpoints\` and every request gets the header.

## Class-based middleware

For non-trivial logic, extract a class:

\`\`\`csharp
public class CorrelationIdMiddleware
{
    private readonly RequestDelegate _next;
    public CorrelationIdMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext ctx)
    {
        var id = ctx.Request.Headers["X-Correlation-Id"].FirstOrDefault() ?? Guid.NewGuid().ToString();
        ctx.Response.Headers["X-Correlation-Id"] = id;
        await _next(ctx);
    }
}

// register
app.UseMiddleware<CorrelationIdMiddleware>();
\`\`\``,
    },
    {
      id: 'l-aspn-4',
      title: 'MVC & Razor Pages',
      type: 'theory',
      xp: 15,
      theory: `# MVC

For server-rendered HTML the long-standing pattern is **MVC**: Models (data), Views (Razor templates), Controllers (request handlers).

\`\`\`csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        var vm = new HomeViewModel { Greeting = "Hello!" };
        return View(vm);     // renders Views/Home/Index.cshtml
    }
}
\`\`\`

\`\`\`razor
@model HomeViewModel
<h1>@Model.Greeting</h1>
\`\`\`

Routes can be conventional (\`{controller}/{action}/{id?}\`) or attribute-driven (\`[Route("api/[controller]")]\`).

## Razor Pages

A simpler alternative for page-based apps. Each page is a folder of \`Page.cshtml\` + \`Page.cshtml.cs\`:

\`\`\`csharp
public class IndexModel : PageModel
{
    public string Greeting { get; set; } = "";

    public void OnGet()
    {
        Greeting = "Hello!";
    }

    public IActionResult OnPost(string name)
    {
        Greeting = $"Hello, {name}!";
        return Page();
    }
}
\`\`\`

\`\`\`razor
@page
@model IndexModel
<h1>@Model.Greeting</h1>
<form method="post">
    <input name="name" />
    <button>Say hi</button>
</form>
\`\`\`

Less ceremony than MVC for form-heavy apps; the page IS the URL.

## When to use what

| Want | Use |
|---|---|
| JSON API, microservice | Minimal APIs |
| Server-rendered HTML, multi-page app | MVC or Razor Pages |
| Simple page-based site | Razor Pages |
| Big team, lots of structure | MVC |
| Tiny endpoint, AOT-friendly | Minimal APIs |

There is **no wrong answer** — they all share routing, model binding, and the middleware pipeline.`,
    },
    {
      id: 'l-aspn-5',
      title: 'EF Core in 60 seconds',
      type: 'theory',
      xp: 15,
      theory: `# EF Core (a tour)

**Entity Framework Core** is .NET's official ORM (Object-Relational Mapper). You write C# classes; EF generates SQL, manages migrations, and tracks changes.

## DbContext

The central object. Lifetime = one **unit of work** (typically one HTTP request).

\`\`\`csharp
public class AppDb : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnConfiguring(DbContextOptionsBuilder o)
        => o.UseSqlServer(_connectionString);
}
\`\`\`

Or via DI:

\`\`\`csharp
builder.Services.AddDbContext<AppDb>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
\`\`\`

## Basic operations

\`\`\`csharp
// Read
var alice = await db.Users.FirstAsync(u => u.Email == "alice@example.com");
var top = await db.Orders.Where(o => o.Total > 100).OrderByDescending(o => o.Date).Take(10).ToListAsync();

// Insert
db.Users.Add(new User { Name = "Bob" });
await db.SaveChangesAsync();

// Update — change-tracking + SaveChanges
alice.Name = "Alice Smith";
await db.SaveChangesAsync();

// Delete
db.Users.Remove(alice);
await db.SaveChangesAsync();
\`\`\`

EF builds the SQL from your LINQ. Inspect with \`ToQueryString()\` to see exactly what's being executed.

## Migrations

Schema changes are tracked as code:

\`\`\`bash
dotnet ef migrations add AddPhoneNumber
dotnet ef database update
\`\`\`

A timestamped \`.cs\` file lands in your \`Migrations/\` folder. Commit it. Other devs run \`database update\` and their schema catches up.

## AsNoTracking

For read-only queries, opt out of change tracking:

\`\`\`csharp
var users = await db.Users.AsNoTracking().Where(...).ToListAsync();
\`\`\`

Faster — and avoids retaining objects unnecessarily.

## Watch out for

- **N+1 queries** — accidentally pulling 1000 children with 1 query per parent. Use \`.Include(x => x.Orders)\` to project the join.
- **Tracking large reads** — kills memory; \`AsNoTracking\` for reports
- **Lazy loading** — off by default in EF Core; can be enabled but causes surprise queries

EF Core deserves its own dedicated study. This is the 60-second tour — when you actually build with EF you'll spend serious time understanding the change tracker, query translation, and migrations.`,
    },
    {
      id: 'l-aspn-6',
      title: 'ASP.NET Core Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why does middleware order matter?',
          options: [
            'It doesn\'t — they\'re commutative',
            'Each middleware sees the request before the next one and the response after; wrong order can break auth, logging, etc.',
            'Performance only',
            'Only matters in production',
          ],
          correctIndex: 1,
          explanation: 'A request walks the chain top-down to your endpoint, then back up. UseAuthentication BEFORE UseAuthorization is required so authz can read the authenticated user.',
        },
        {
          question: 'What does the constraint `{id:int}` do in `MapGet("/users/{id:int}")`?',
          options: [
            'Names the parameter `int`',
            'Rejects requests where `id` isn\'t an integer — happens before your code',
            'Makes the route optional',
            'Forces id to be 32 bits',
          ],
          correctIndex: 1,
          explanation: 'Route constraints filter incoming requests at routing time. /users/abc returns 404 without invoking your handler.',
        },
        {
          question: 'What lifetime does a DbContext usually get?',
          options: ['Singleton', 'Scoped (per request)', 'Transient', 'Static field'],
          correctIndex: 1,
          explanation: 'DbContext represents a unit of work and is not thread-safe. Scoped == one per request is the standard in ASP.NET Core.',
        },
        {
          question: 'Why use `AsNoTracking()` for read-only EF queries?',
          options: [
            'To enforce read-only at the DB level',
            'To skip change-tracking — faster and uses less memory',
            'It\'s required for async queries',
            'It\'s deprecated, don\'t use it',
          ],
          correctIndex: 1,
          explanation: 'Change-tracking maintains snapshots of every retrieved entity. AsNoTracking skips that work — cheaper for reports and listing pages.',
        },
        {
          question: 'Which is the most lightweight ASP.NET Core style for a JSON API?',
          options: ['MVC controllers', 'Razor Pages', 'Minimal APIs', 'gRPC'],
          correctIndex: 2,
          explanation: 'Minimal APIs are designed for terse JSON endpoints with no controller class boilerplate. MVC is heavier and shines for big teams or HTML rendering.',
        },
      ],
    },
  ],
};

const chClr: Chapter = {
  id: 'ch-clr',
  title: 'CLR & GC Internals',
  description: 'How .NET runs your code',
  icon: '⚙️',
  lessons: [
    {
      id: 'l-clr-1',
      title: 'CLR & JIT',
      type: 'theory',
      xp: 25,
      theory: `# The Common Language Runtime (CLR)

C# code is compiled to **IL** (Intermediate Language), not native code. At runtime the **CLR** (Common Language Runtime) loads your assemblies and the **JIT** (Just-In-Time) compiler turns IL into native instructions on demand.

## Compile pipeline

\`\`\`
.cs → C# compiler (Roslyn) → IL (.dll) → JIT → native code → CPU
\`\`\`

Compiling to IL keeps your code portable across CPUs. The JIT specializes for the host architecture (x86, x64, ARM64) on first call.

## Tiered JIT

Modern .NET uses **tiered compilation**:

1. **Tier 0** — fast, low-quality codegen on first call. Gets methods running quickly.
2. **Tier 1** — re-JIT hot methods (called many times) at higher quality with more optimizations.

This is why throughput is lower at app startup but climbs after a warm-up period.

## On-Stack Replacement (OSR)

If a method is in a long-running loop at tier 0, the JIT can swap it to tier 1 **mid-execution**. Real-world programs see this most in startup loops processing big batches.

## Profile-Guided Optimization (PGO)

Newer JIT collects branch / type info during tier 0 and uses it to make better tier 1 codegen. Enabled by default in .NET 8+.

## ReadyToRun (R2R)

Skip the cold-start JIT cost by **pre-JIT-ing** to native at publish time:

\`\`\`bash
dotnet publish -c Release -p:PublishReadyToRun=true
\`\`\`

The framework BCL already ships R2R. Your own code can opt in for big-startup-cost apps.

## Native AOT

The most aggressive — compile your entire app to a single native binary at publish time, no JIT at runtime, no IL:

\`\`\`bash
dotnet publish -c Release -p:PublishAot=true
\`\`\`

**Pros:** instant startup, smaller memory footprint, smaller binary
**Cons:** no runtime reflection on dynamic types, no Assembly.Load, careful with libraries that use codegen
**Use cases:** CLI tools, serverless functions, edge containers`,
    },
    {
      id: 'l-clr-2',
      title: 'Garbage Collection',
      type: 'theory',
      xp: 25,
      theory: `# The Garbage Collector

The GC manages all memory on the .NET heap. Three big rules to know.

## Generations

The heap is split into three generations based on age:

| Gen | Holds | Collected |
|---|---|---|
| **Gen 0** | Brand new objects | Often (cheap) |
| **Gen 1** | Survived 1 collection | Less often |
| **Gen 2** | Survived 2 collections | Rarely (expensive — touches the whole heap) |

The "generational hypothesis": most objects die young. Gen 0 collections are the common case and they're fast because they only walk recent allocations.

## Large Object Heap (LOH)

Objects ≥ ~85,000 bytes go straight to the **LOH**, a separate space that's only touched by Gen 2 collections (expensive). The LOH is also not compacted by default — fragmentation accumulates.

If you allocate big arrays often, look at:
- \`ArrayPool<T>.Shared\` — rent + return so you reuse buffers
- \`Span<T>\` over chunks of one big buffer
- \`GC.Collect(2, GCCollectionMode.Aggressive, blocking: true, compacting: true)\` for one-shot defrag (sparingly)

## Pinned Object Heap (POH, .NET 5+)

A separate heap for pinned objects (pinned for native interop). Keeps pinning out of the regular heap so the GC can compact freely.

\`\`\`csharp
var arr = GC.AllocateUninitializedArray<byte>(1024, pinned: true);
\`\`\`

## Workstation vs Server GC

| Mode | When | Trade-off |
|---|---|---|
| **Workstation** | Default for client / desktop apps | Single-threaded, low-latency, lower throughput |
| **Server** | Default for ASP.NET Core | One GC thread per CPU, much higher throughput, larger heap, slightly higher latency on collections |

Toggle with:

\`\`\`xml
<PropertyGroup>
  <ServerGarbageCollection>true</ServerGarbageCollection>
  <ConcurrentGarbageCollection>true</ConcurrentGarbageCollection>
</PropertyGroup>
\`\`\`

## Background / concurrent GC

Most Gen 2 collection work happens on a background thread to avoid stop-the-world pauses. You generally want this on.`,
    },
    {
      id: 'l-clr-3',
      title: 'Allocation-free patterns',
      type: 'theory',
      xp: 20,
      theory: `# Avoiding allocations

The GC is fast, but **the cheapest allocation is the one you don't do**. In hot paths these patterns matter.

## Span<T> and Memory<T>

\`Span<T>\` is a stack-only view over a contiguous region (array, string, native memory). No allocation, no copy.

\`\`\`csharp
public int CountSpaces(string s)
{
    int count = 0;
    foreach (var c in s.AsSpan())   // no allocation
        if (c == ' ') count++;
    return count;
}

public ReadOnlySpan<char> Trim(string s) => s.AsSpan().Trim();   // no string copy
\`\`\`

\`Span<T>\` is a \`ref struct\` — can't be stored on the heap, only on the stack or as a parameter. That's the magic that makes it safe and free.

\`Memory<T>\` is the heap-friendly cousin: same idea but storable in fields, awaitable, etc. Slower than Span.

## ArrayPool<T>

Renting from a pool instead of allocating:

\`\`\`csharp
var buffer = ArrayPool<byte>.Shared.Rent(4096);
try
{
    int read = await stream.ReadAsync(buffer, 0, buffer.Length);
    // ...
}
finally
{
    ArrayPool<byte>.Shared.Return(buffer);
}
\`\`\`

Critical for code paths that read/write fixed-size buffers in a loop. The runtime pools buffers internally for HTTP / TLS / zlib.

## ObjectPool<T>

\`Microsoft.Extensions.ObjectPool\` for reusable rich objects (StringBuilder, custom DTOs). Same renting pattern.

## stackalloc

For tiny scratch buffers (≤ ~1024 bytes), allocate on the stack:

\`\`\`csharp
Span<byte> buf = stackalloc byte[256];
\`\`\`

No heap allocation, no GC pressure, no need to free. Use only for **bounded, small** sizes — overflowing the stack crashes the process.

## ref struct

Mark your own struct \`ref struct\` to forbid heap storage:

\`\`\`csharp
ref struct Reader
{
    private ReadOnlySpan<byte> _data;
    public Reader(ReadOnlySpan<byte> data) => _data = data;
}
\`\`\`

The compiler ensures the struct never escapes to a field, async state machine, or generic — staying purely stack-bound.

## Strings vs StringBuilder

We covered StringBuilder earlier. The advanced version: when concatenating known-size pieces, prefer \`string.Concat(...)\` or \`String.Create\` — they allocate the final string in one shot.

## When to optimize

NEVER guess. Profile first (next lesson). Most code doesn't need any of this — readability wins. The 1% that does need it benefits enormously.`,
    },
    {
      id: 'l-clr-4',
      title: 'CLR & GC Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which Gen-N collection is the **most** expensive?',
          options: ['Gen 0', 'Gen 1', 'Gen 2', 'They\'re identical'],
          correctIndex: 2,
          explanation: 'Gen 2 walks the entire long-lived heap including the LOH. Gen 0 only touches recent allocations.',
        },
        {
          question: 'What size threshold sends an object straight to the LOH?',
          options: ['1 KB', '~10 KB', '~85 KB', '~1 MB'],
          correctIndex: 2,
          explanation: '85,000 bytes is the historical threshold. Big arrays (especially long[] / double[]) bypass Gen 0 and live in the LOH.',
        },
        {
          question: 'When should you use `Span<T>`?',
          options: [
            'Anywhere you used to use arrays',
            'On hot paths to avoid allocating substrings or temporary arrays',
            'Only for binary data',
            'Never — it\'s for low-level code only',
          ],
          correctIndex: 1,
          explanation: 'Span<T> shines for hot paths that operate over contiguous data without allocation. For ordinary code, plain arrays / strings are fine.',
        },
        {
          question: 'Which JIT mode produces low-quality fast codegen first then re-JITs hot methods at higher quality?',
          options: ['Native AOT', 'ReadyToRun', 'Tiered Compilation', 'Edit-and-Continue'],
          correctIndex: 2,
          explanation: 'Tiered JIT compiles to Tier 0 fast on first call, then re-JITs hot methods to Tier 1 with full optimization once the runtime has data.',
        },
      ],
    },
  ],
};

const chPerf: Chapter = {
  id: 'ch-perf',
  title: 'Performance & Profiling',
  description: 'Measure first, optimize second',
  icon: '⏱️',
  lessons: [
    {
      id: 'l-pf-1',
      title: 'BenchmarkDotNet',
      type: 'theory',
      xp: 20,
      theory: `# BenchmarkDotNet

The de-facto micro-benchmarking framework for .NET. It handles all the things you'd get wrong by hand: warmup, statistical analysis, GC measurement, multi-runtime comparison.

## A minimal benchmark

\`\`\`csharp
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]
public class StringConcatBench
{
    private readonly string[] _parts = Enumerable.Range(0, 100).Select(i => i.ToString()).ToArray();

    [Benchmark(Baseline = true)]
    public string PlusEquals()
    {
        string s = "";
        foreach (var p in _parts) s += p;
        return s;
    }

    [Benchmark]
    public string StringBuilder()
    {
        var sb = new System.Text.StringBuilder();
        foreach (var p in _parts) sb.Append(p);
        return sb.ToString();
    }

    [Benchmark]
    public string StringJoin() => string.Join("", _parts);
}

class Program
{
    static void Main() => BenchmarkRunner.Run<StringConcatBench>();
}
\`\`\`

\`dotnet run -c Release\` prints a table:

\`\`\`
| Method        | Mean       | Ratio | Allocated |
|-------------- |----------- |------ |---------- |
| PlusEquals    | 2,351 ns   |  1.00 |  6,432 B  |
| StringBuilder |   312 ns   |  0.13 |    296 B  |
| StringJoin    |   180 ns   |  0.08 |    192 B  |
\`\`\`

## Common attributes

- \`[MemoryDiagnoser]\` — adds allocation columns
- \`[ThreadingDiagnoser]\` — measures lock contention
- \`[Params(1, 10, 100, 1000)]\` — run the benchmark over multiple values
- \`[ArgumentsSource(nameof(Inputs))]\` — for complex test data
- \`[SimpleJob(RuntimeMoniker.Net90)]\` + multiple — compare runtimes

## Important rules

- Benchmarks must run **in Release**, never Debug
- Methods must return their result so the JIT can't dead-code-eliminate
- Each benchmark should do work in ~100ns - 1ms; for shorter ops use \`[ShortRunJob]\`

## When NOT to micro-benchmark

End-to-end response time, throughput under load, contention — those need real load tests (k6, JMeter, NBomber). BDN measures **single-threaded micro-ops**.`,
    },
    {
      id: 'l-pf-2',
      title: 'Profiling production',
      type: 'theory',
      xp: 20,
      theory: `# Profiling

When something's slow in production, you reach for one of these:

## dotnet-counters — live counters

Real-time CPU, memory, GC, ThreadPool, Kestrel metrics:

\`\`\`bash
dotnet-counters monitor -p <pid>
\`\`\`

Watching counters often reveals the issue immediately: GC time-in-percent climbing, ThreadPool starvation, etc.

## dotnet-trace — capture runtime events

Records EventPipe traces (compatible with PerfView):

\`\`\`bash
dotnet-trace collect -p <pid> --providers Microsoft-DotNETCore-SampleProfiler
\`\`\`

Outputs a \`.nettrace\` file you open in PerfView, Windows Performance Analyzer, or Visual Studio diagnostic tools.

The \`SampleProfiler\` records call stacks at intervals — perfect for "where is the CPU going?" investigations.

## dotnet-dump — capture a memory snapshot

\`\`\`bash
dotnet-dump collect -p <pid>
dotnet-dump analyze core_<...>.dmp
\`\`\`

Inside the analyzer:

\`\`\`
> dumpheap -stat              # what types are on the heap, by size
> dumpheap -mt <addr>         # all instances of a type
> gcroot <addr>               # what's holding this object alive
> threads                     # all managed threads
> clrstack                    # current thread's call stack
\`\`\`

This is the tool of choice for **memory leaks** and **deadlock investigations**.

## PerfView (Windows)

The veteran. Records ETW traces with deeper integration into Windows kernel events. Steeper learning curve; unmatched detail when you need it.

## Application Insights / OpenTelemetry / APM

For distributed apps, you want **per-request tracing** with span breakdowns by service hop. Tools: Datadog, New Relic, Honeycomb, Grafana Tempo, Application Insights. Always-on; correlates request flow across services.

## Visual Studio / Rider profilers

Built-in IDE profilers attach to a running process and offer GUI flame charts:

- VS: Debug → Performance Profiler (CPU, memory, allocations)
- Rider: dotTrace integration (timeline, sampling, tracing)

Great for local investigation; less useful in production.

## Pick the right tool

| Symptom | Start with |
|---|---|
| App is slow / high CPU | dotnet-counters → dotnet-trace |
| Memory grows over time | dotnet-counters (gc heap size) → dotnet-dump |
| Slow DB queries | application logs + EF query logging |
| Slow per-request flow | OpenTelemetry / APM |
| Cold-start slowness | dotnet-counters at startup → R2R / AOT |`,
    },
    {
      id: 'l-pf-3',
      title: 'High-perf I/O',
      type: 'theory',
      xp: 20,
      theory: `# High-performance I/O

For middleware that pushes a lot of bytes — proxies, gateways, file servers, MQ clients — the bottleneck is rarely CPU. It's allocation and copies.

## System.IO.Pipelines

\`Pipe\` is a high-performance equivalent of \`Stream\` designed for parsers. Its API gives you a sliding window of bytes you can process without copies.

\`\`\`csharp
async Task ProcessAsync(PipeReader reader)
{
    while (true)
    {
        ReadResult result = await reader.ReadAsync();
        ReadOnlySequence<byte> buffer = result.Buffer;

        while (TryParseLine(ref buffer, out var line))
            HandleLine(line);

        // Tell the pipe how much we actually consumed
        reader.AdvanceTo(buffer.Start, buffer.End);

        if (result.IsCompleted) break;
    }
    await reader.CompleteAsync();
}
\`\`\`

The \`ReadOnlySequence<byte>\` may span multiple internal buffers; you process the slice you've parsed and \`AdvanceTo\` declares what's still needed. The pipe handles backpressure and reuse automatically.

Kestrel, SignalR, and YARP all run on Pipelines under the hood.

## Channels

\`System.Threading.Channels\` is an in-process, async-friendly producer/consumer queue. Ideal for batching work, decoupling stages of a pipeline, and limiting concurrency:

\`\`\`csharp
var channel = Channel.CreateBounded<Work>(new BoundedChannelOptions(100)
{
    SingleReader = true,
    SingleWriter = false,
    FullMode = BoundedChannelFullMode.Wait
});

// producers
await channel.Writer.WriteAsync(item);

// consumer
await foreach (var item in channel.Reader.ReadAllAsync(ct))
    Process(item);
\`\`\`

Bounded channels apply backpressure: writers wait when full. Unbounded ones don't — easy to OOM, use carefully.

## SocketsHttpHandler tuning

Default \`HttpClient\` is fine for most cases. For aggressive HTTP loads:

\`\`\`csharp
var handler = new SocketsHttpHandler
{
    PooledConnectionIdleTimeout = TimeSpan.FromMinutes(2),
    PooledConnectionLifetime = TimeSpan.FromMinutes(15),
    MaxConnectionsPerServer = 100,
    EnableMultipleHttp2Connections = true
};
var client = new HttpClient(handler);
\`\`\`

Pair with **\`IHttpClientFactory\`** so the handler is reused across calls — creating a new HttpClient per request is the most common .NET perf trap (socket exhaustion).

## HTTP/2 and HTTP/3 (QUIC)

Modern .NET supports both as a server (Kestrel) and client (\`HttpClient\`). Multiplexing eliminates head-of-line blocking; HTTP/3 over QUIC removes TCP-level retransmits. Wire it up; verify with curl \`--http3\` or \`netsh http show iplisten\`.`,
    },
    {
      id: 'l-pf-4',
      title: 'Performance Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What\'s the cardinal rule of optimization?',
          options: [
            'Always use the latest pattern',
            'Profile first, optimize second',
            'Premature optimization is good',
            'Async is always faster',
          ],
          correctIndex: 1,
          explanation: 'Without measurement you optimize the wrong thing. Profile -> identify hot path -> change -> re-profile.',
        },
        {
          question: 'Why use `IHttpClientFactory` instead of `new HttpClient()` per call?',
          options: [
            'Faster construction',
            'Reuses pooled connections — avoids socket exhaustion',
            'Type safety',
            'Required for HTTPS',
          ],
          correctIndex: 1,
          explanation: 'Each `new HttpClient()` opens fresh sockets. Under load you exhaust ephemeral ports. The factory pools handlers.',
        },
        {
          question: 'Which tool would you reach for to investigate a memory leak?',
          options: [
            'dotnet-counters',
            'dotnet-trace',
            'dotnet-dump (heap snapshot, gcroot)',
            'BenchmarkDotNet',
          ],
          correctIndex: 2,
          explanation: 'A heap snapshot lets you walk all objects, find the type that\'s growing, and use gcroot to find what\'s holding it.',
        },
        {
          question: 'What kind of work is `BenchmarkDotNet` best suited for?',
          options: [
            'End-to-end load tests',
            'Single-threaded micro-benchmarks of small methods',
            'Real-world request throughput',
            'Integration tests',
          ],
          correctIndex: 1,
          explanation: 'BDN measures single-threaded micro-ops with statistical rigor. For end-to-end load use k6, JMeter, or NBomber.',
        },
      ],
    },
  ],
};

const chObs: Chapter = {
  id: 'ch-obs',
  title: 'Observability',
  description: 'Tracing, metrics, and logs in production',
  icon: '👁️',
  lessons: [
    {
      id: 'l-obs-1',
      title: 'OpenTelemetry & .NET',
      type: 'theory',
      xp: 20,
      theory: `# Observability

The "three pillars" your service should emit:

| Pillar | Question it answers | .NET API |
|---|---|---|
| **Logs** | What happened in this specific event? | \`ILogger<T>\` |
| **Metrics** | How is the system trending? (counters, gauges) | \`Meter\`, \`Counter<T>\`, \`Histogram<T>\` |
| **Traces** | How did this single request flow through services? | \`Activity\`, \`ActivitySource\` |

In modern .NET these all integrate with **OpenTelemetry (OTel)** — a vendor-neutral standard for telemetry. You instrument once, export to any backend (Datadog, Honeycomb, Grafana Tempo, Application Insights, ...).

## Wiring OTel

\`\`\`csharp
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService("OrderService"))
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddEntityFrameworkCoreInstrumentation()
        .AddOtlpExporter())                  // send to collector / backend
    .WithMetrics(m => m
        .AddAspNetCoreInstrumentation()
        .AddRuntimeInstrumentation()         // GC, heap, threadpool
        .AddOtlpExporter())
    .WithLogging(l => l.AddOtlpExporter());
\`\`\`

After this, your normal \`ILogger\`, \`HttpClient\`, EF queries, and ASP.NET Core requests all emit traced telemetry automatically.

## Custom traces

\`\`\`csharp
private static readonly ActivitySource Source = new("OrderService");

public async Task SubmitAsync(Order o)
{
    using var span = Source.StartActivity("Submit Order");
    span?.SetTag("order.id", o.Id);
    span?.SetTag("customer.id", o.CustomerId);

    await _db.SaveAsync(o);
    await _email.SendAsync(o);
}
\`\`\`

The using-disposed Activity records start/end time and any tags. If a parent activity exists (e.g. an HTTP request), this becomes a child span.

## Custom metrics

\`\`\`csharp
private static readonly Meter Meter = new("OrderService");
private static readonly Counter<int> OrdersSubmitted = Meter.CreateCounter<int>("orders.submitted");
private static readonly Histogram<double> OrderValue = Meter.CreateHistogram<double>("order.value");

public void Track(Order o)
{
    OrdersSubmitted.Add(1, KeyValuePair.Create<string, object?>("currency", o.Currency));
    OrderValue.Record(o.Total);
}
\`\`\`

Counters and histograms get aggregated and shipped to your backend on the configured interval.`,
    },
    {
      id: 'l-obs-2',
      title: 'Distributed tracing',
      type: 'theory',
      xp: 15,
      theory: `# Distributed tracing

In a microservice world, a single user click might fan out to: API gateway → auth → orders → inventory → payment → email. Distributed tracing links those into one **trace** with each service contributing **spans**.

## How it works

1. The first service generates a trace ID + initial span ID.
2. When it calls the next service, it injects \`traceparent\` HTTP header (W3C trace context standard).
3. The next service reads the header, creates child spans under the same trace ID.
4. Every span ships to a backend; the backend reconstructs the tree.

## In .NET

The runtime handles propagation automatically — \`HttpClient\` injects \`traceparent\`, ASP.NET Core extracts it. You don't write any plumbing.

## What to instrument

For each significant operation:

\`\`\`csharp
using var span = Source.StartActivity("Charge card");
span?.SetTag("card.last4", last4);
span?.SetTag("amount", amount);

try
{
    var result = await _stripe.ChargeAsync(amount);
    span?.SetTag("stripe.id", result.Id);
}
catch (Exception ex)
{
    span?.SetStatus(ActivityStatusCode.Error, ex.Message);
    throw;
}
\`\`\`

Tags are queryable in your APM ("show all charges where amount > $100 in the last hour"). Names should be the **operation**, not the function.

## Sampling

Recording every request at scale is expensive. Set a **sampling ratio**:

\`\`\`csharp
.WithTracing(t => t.SetSampler(new TraceIdRatioBasedSampler(0.1)))   // 10%
\`\`\`

Or use **tail-based sampling** at the collector — keep all errors, sample the successes. Better signal, lower volume.

## Correlation IDs in logs

Logs benefit from the same trace ID. With OTel, \`ILogger\` auto-includes \`TraceId\` and \`SpanId\` in structured output. Now you can pivot from a span timeline to the exact log lines emitted during that span.`,
    },
    {
      id: 'l-obs-3',
      title: 'Observability Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Which "pillar" answers "how is the system trending"?',
          options: ['Logs', 'Metrics', 'Traces', 'Dumps'],
          correctIndex: 1,
          explanation: 'Metrics are aggregated values over time (counters, histograms, gauges). Logs answer "what happened in this event"; traces answer "how did this request flow".',
        },
        {
          question: 'What does the W3C `traceparent` header do?',
          options: [
            'Authenticates the caller',
            'Carries the trace ID + parent span ID across service boundaries',
            'Compresses the trace',
            'Routes the request',
          ],
          correctIndex: 1,
          explanation: 'traceparent links spans across services into one distributed trace. Modern .NET handles propagation transparently.',
        },
        {
          question: 'You record every request at full fidelity. What\'s the typical fix at scale?',
          options: [
            'Buy more storage',
            'Sampling — head-based percentage or tail-based (keep errors, sample successes)',
            'Drop traces entirely',
            'Move to Splunk',
          ],
          correctIndex: 1,
          explanation: 'Sampling reduces telemetry volume while preserving signal. Tail-based sampling at the OTel collector is especially powerful — see all errors, sample healthy traffic.',
        },
        {
          question: 'OpenTelemetry replaces which kinds of vendor SDKs?',
          options: [
            'Only metrics SDKs',
            'Logs, metrics, and traces SDKs from APM vendors',
            'Only Application Insights',
            'Only on Linux',
          ],
          correctIndex: 1,
          explanation: 'OTel is vendor-neutral. Instrument with OTel APIs once, export to whatever backend (Datadog, Honeycomb, Tempo, AppInsights). No more SDK lock-in.',
        },
      ],
    },
  ],
};

const chArch: Chapter = {
  id: 'ch-arch',
  title: 'Architecture Patterns',
  description: 'How big .NET systems are organized',
  icon: '🏛️',
  lessons: [
    {
      id: 'l-ar-1',
      title: 'Domain-Driven Design',
      type: 'theory',
      xp: 20,
      theory: `# Domain-Driven Design (DDD)

DDD is a way of designing software around the **language and rules of the business**, not around technical layers.

## Tactical building blocks

| Pattern | Idea |
|---|---|
| **Entity** | Has an identity (ID) that survives mutations. \`Order\`, \`Customer\` |
| **Value Object** | Equality is by value; immutable. \`Money\`, \`DateRange\`, \`Address\` |
| **Aggregate** | A cluster of entities + VOs treated as one transactional unit, with one **root** entity (e.g. \`Order\` is the root, \`OrderLine\`s are inside) |
| **Domain Service** | Logic that doesn't fit a single entity (e.g. \`PriceCalculator\`) |
| **Repository** | Saves/loads aggregates by ID — abstracts persistence |
| **Domain Event** | "Something happened" — \`OrderPlaced\`, \`PaymentReceived\` |

## Aggregate boundaries

The aggregate root is the only entry point. Outside callers can't reach \`OrderLine\` directly — they go through \`Order\`. This keeps invariants enforceable in one place.

\`\`\`csharp
public class Order : Entity
{
    private readonly List<OrderLine> _lines = new();
    public IReadOnlyList<OrderLine> Lines => _lines;

    public void AddLine(Product p, int qty)
    {
        if (qty <= 0) throw new InvalidOperationException("qty must be positive");
        if (Status != OrderStatus.Draft) throw new InvalidOperationException();
        _lines.Add(new OrderLine(p.Id, p.Price, qty));
        // raise OrderLineAdded domain event
    }
}
\`\`\`

\`AddLine\` enforces "lines can only be added to drafts" and "qty > 0" — invariants of the Order aggregate.

## Strategic side: Bounded Contexts

Big businesses have **multiple meanings** of the same word. "Customer" in Sales is not the same as "Customer" in Support. DDD says: split your system into **bounded contexts**, each with its own model.

- Bounded contexts often map to microservices, but not always — a modular monolith can have bounded contexts with module boundaries.
- Cross-context communication uses **integration events** (different from domain events) over a bus.

## Where DDD fits

- Complex business domains where the **rules** change a lot — insurance, finance, healthcare, e-commerce checkout
- Less useful for CRUD-heavy admin panels — there's no rich domain to model
- Heavy upfront investment; pays off when modeling discipline keeps complexity from exploding`,
    },
    {
      id: 'l-ar-2',
      title: 'CQRS & Event Sourcing',
      type: 'theory',
      xp: 20,
      theory: `# CQRS and Event Sourcing

## CQRS — Command Query Responsibility Segregation

Reads (queries) and writes (commands) take different paths through your system. Each can be optimized independently.

\`\`\`
              ┌── Commands ──→ Domain Model ──→ Event Store
Client ──────┤
              └── Queries  ──→ Read Models   ←── (projections)
\`\`\`

- **Commands** mutate state via the domain model with all its rules
- **Queries** read from denormalized "read models" optimized for the UI

CQRS without ES (event sourcing) is fine: just two paths, often two database layouts. CQRS shines when the read shape is *very* different from the write shape.

## Event Sourcing

Instead of storing the **current state** of an aggregate, store the **sequence of events** that produced it:

\`\`\`
Order #42:
  - OrderCreated(2026-01-01, customer=10)
  - LineAdded(productId=1, qty=2)
  - LineAdded(productId=5, qty=1)
  - OrderConfirmed(2026-01-02)
  - PaymentReceived(amount=99)
\`\`\`

To get the current state, **replay** the events. To reconstitute past state, replay only events up to a point.

## Wins

- **Audit log** is free — every change is a stored event
- **Time travel** — see the system as of any past moment
- **Multiple projections** — derive different read models from the same events
- **Easy event-driven integration** — events on the wire ARE the events you stored

## Costs

- Schemas evolve; you need event versioning + upcasting strategies
- Replay can be slow on long streams — snapshots help
- Steeper learning curve, harder onboarding for the team
- Debugging is unfamiliar (no "current state" row to inspect)

## .NET tooling

- **EventStoreDB** — purpose-built event store
- **Marten** — Postgres-backed document + event store
- **EF Core + custom append-only tables** — DIY, lighter
- **Aspire** + EventStoreDB module — getting popular

## Recommendation

Don't start with ES. Start with CQRS without ES. Adopt ES only when you've felt audit-log pain or you have a domain (banking, healthcare records, regulatory) where every change must be reconstructible.`,
    },
    {
      id: 'l-ar-3',
      title: 'Clean / Hexagonal & Modular Monolith',
      type: 'theory',
      xp: 20,
      theory: `# Clean Architecture / Hexagonal

The same idea under different names: **the domain doesn't depend on infrastructure**. Dependencies point **inward**.

## The layers

\`\`\`
┌──────────────────────────────┐
│ Infrastructure (DB, HTTP, FS)│ ← outer
│ ┌──────────────────────────┐ │
│ │ Application (use cases)   │ │
│ │ ┌──────────────────────┐ │ │
│ │ │ Domain (entities, rules)│ │ ← inner
│ │ └──────────────────────┘ │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
\`\`\`

- **Domain** — entities, value objects, domain events. No DB. No HTTP. Pure logic.
- **Application** — use cases / commands / handlers. Orchestrates domain. Defines interfaces it needs (e.g. \`IOrderRepository\`).
- **Infrastructure** — implementations of those interfaces. EF Core, HttpClient, etc.

The **Dependency Inversion Principle** at the boundary: Application depends on \`IOrderRepository\` (interface). Infrastructure provides \`EFOrderRepository\` (implementation). The arrows point inward.

## Typical project layout

\`\`\`
MyApp.Domain/        — entities, VOs, events
MyApp.Application/   — commands, queries, DTOs, handler interfaces
MyApp.Infrastructure/— DbContext, repos, external API clients
MyApp.Web/           — ASP.NET Core minimal APIs / controllers
\`\`\`

The Web project references all three; Domain references nothing.

## Hexagonal (Ports & Adapters)

Same idea, different vocabulary:
- **Ports** = interfaces the application uses (input ports = use cases; output ports = repository / messaging interfaces)
- **Adapters** = concrete implementations (HTTP adapter, DB adapter, message queue adapter)

You can swap adapters without touching the inside of the hexagon.

## Modular Monolith

Microservices have real costs (network latency, distributed transactions, deployment complexity). The **modular monolith** keeps domains separate **inside one process**:

\`\`\`
MyApp/
  Modules/
    Catalog/
      Domain/
      Application/
      Infrastructure/
    Orders/
      Domain/
      Application/
      Infrastructure/
    Shipping/
      ...
  Host/
\`\`\`

Each module has its own DbContext (usually its own schema), its own use cases, exposes a public API the host wires up. Cross-module calls go through that API.

When pain warrants it, you split a module out into a service. Until then, you have monolith deployment with microservice discipline.

## When to choose what

- **Layered (3-tier)** — simple CRUD apps, small teams
- **Clean/Hex** — non-trivial domain logic, multiple presentation channels
- **Modular monolith** — multi-domain product, anticipate scaling out later
- **Microservices** — separate teams, separate deploy cadence, scale-out boundaries already understood`,
    },
    {
      id: 'l-ar-4',
      title: 'Architecture Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'In DDD, what is the difference between an Entity and a Value Object?',
          options: [
            'Entities are stored in DB, VOs aren\'t',
            'Entity has a stable identity (id); VO equals by content and is immutable',
            'VOs can\'t have methods',
            'Entities are always strings',
          ],
          correctIndex: 1,
          explanation: 'Entity = identity that survives content changes (an Order is the same Order even after its lines change). VO = identity = value (Money(10, "USD") equals another Money(10, "USD")).',
        },
        {
          question: 'What does Clean Architecture say about dependencies?',
          options: [
            'They flow outward',
            'They flow inward — domain depends on nothing, infrastructure depends on domain',
            'There are no dependencies',
            'Dependencies are bidirectional',
          ],
          correctIndex: 1,
          explanation: 'Dependency Inversion at the boundary keeps the domain pure and testable. Infrastructure implements interfaces that the domain/application define.',
        },
        {
          question: 'What\'s the main benefit of Event Sourcing?',
          options: [
            'Faster reads',
            'Complete audit log + ability to replay state at any point',
            'Smaller storage',
            'Simpler debugging',
          ],
          correctIndex: 1,
          explanation: 'ES keeps the entire history. You can audit, time-travel, derive new projections — all from the immutable event log.',
        },
        {
          question: 'When does a modular monolith beat microservices?',
          options: [
            'Always',
            'When the team is small, deploys are coupled, and you want to defer the cost of distributed systems',
            'Never — microservices are always better',
            'Only on Windows',
          ],
          correctIndex: 1,
          explanation: 'Microservices cost: network calls, distributed transactions, more deploys, more infra. Mod-mono postpones that cost while preserving the design discipline. Split when scaling reasons demand it.',
        },
      ],
    },
  ],
};

const chDist: Chapter = {
  id: 'ch-dist',
  title: 'Distributed Systems with .NET',
  description: 'Messaging, idempotency, sagas',
  icon: '🌐',
  lessons: [
    {
      id: 'l-ds-1',
      title: 'Messaging fundamentals',
      type: 'theory',
      xp: 20,
      theory: `# Messaging in .NET

In a distributed system, services communicate via **messages** as well as HTTP calls. The .NET ecosystem has rich tooling.

## Two basic shapes

| Shape | Pattern | When |
|---|---|---|
| **Commands** | Tell another service to do something. One sender, one consumer. | "Place this order" |
| **Events** | Announce something happened. One sender, many subscribers. | "Order was placed" — billing, fulfillment, analytics all care |

## Brokers

| Broker | Strength |
|---|---|
| **Apache Kafka** | High throughput, log-based, replayable. Streaming workloads. |
| **RabbitMQ** | Mature, flexible routing (exchanges + queues), great for command/RPC patterns |
| **Azure Service Bus** | Cloud-native AMQP, sessions, dead-lettering, deep Azure integration |
| **AWS SQS / SNS** | Same idea on AWS |
| **Google Pub/Sub** | Same idea on GCP |

## .NET libraries on top

| Lib | What it gives |
|---|---|
| **MassTransit** | Bus abstraction across brokers; sagas, scheduling, OTel |
| **NServiceBus** | Commercial alternative to MassTransit, similar feature set |
| **Wolverine** | Newer, built around handler registration with Marten integration |
| **Confluent.Kafka** | Bare-metal Kafka client |
| **RabbitMQ.Client** | Bare-metal RabbitMQ |
| **Azure.Messaging.ServiceBus** | Native ASB SDK |

## When to add messaging

- Async work that should not block the request (send email, generate report)
- Decoupling services that change independently
- Smoothing bursty load — the queue absorbs the spike
- Event sourcing / event-driven architectures

Don't reach for a broker for synchronous request/response — use HTTP/gRPC for that.`,
    },
    {
      id: 'l-ds-2',
      title: 'Idempotency',
      type: 'theory',
      xp: 20,
      theory: `# Idempotency

In distributed systems, **the same message can arrive twice**. Networks retry. Brokers redeliver. Workers crash mid-processing and re-pick up the message.

If your handler does \`charge customer $100\` and runs twice, the customer is charged $200. That's a production incident.

## The fix: handlers must be idempotent

Idempotent = "running it once and running it many times produce the same observable result".

## Patterns

### 1. Check before you act

\`\`\`csharp
public async Task Handle(ChargeCustomer cmd)
{
    if (await _db.Charges.AnyAsync(c => c.CommandId == cmd.Id))
        return;     // already processed

    await _payments.ChargeAsync(cmd.CustomerId, cmd.Amount);
    _db.Charges.Add(new Charge { CommandId = cmd.Id, ... });
    await _db.SaveChangesAsync();
}
\`\`\`

The \`CommandId\` is unique. If we see it twice, we skip.

### 2. Compare-and-set

For state transitions, only succeed if the source state matches expectations:

\`\`\`csharp
UPDATE Orders SET Status = 'Paid' WHERE Id = @id AND Status = 'PendingPayment';
// rowsAffected == 0 means "someone already paid; not us"
\`\`\`

### 3. Natural idempotency

Some operations are inherently idempotent: \`SET\` (vs \`+=\`), \`DELETE\` (already deleted = success), \`PUT\` of a complete resource state.

## Outbox pattern

Atomicity: writing to your DB **and** publishing to a broker should be transactional.

The trick: write the message to an "outbox" table in the same DB transaction as your business write. A separate process polls the outbox and publishes; on success it marks the row sent.

\`\`\`
TX: { Insert Order; Insert OutboxMessage("OrderPlaced") }
   → outbox poller sees new row → publishes to bus → marks row sent
\`\`\`

Crash anywhere; the next worker picks up unsent rows. The bus may receive the message twice — your handler is idempotent, so that's fine.

MassTransit and Wolverine both ship outbox implementations. EF Core 7+ has interceptors that make rolling your own straightforward.

## Inbox pattern

The mirror image on the consumer side: when a message arrives, write it to an inbox table FIRST in the same transaction as your handler's side effects. On a duplicate (same message ID seen before), skip.`,
    },
    {
      id: 'l-ds-3',
      title: 'Sagas',
      type: 'theory',
      xp: 20,
      theory: `# Sagas

A **saga** is a long-running distributed transaction that spans multiple services.

You can't use a single ACID transaction across services. Instead you orchestrate: each step is its own local transaction, and on failure you run **compensating actions** to undo prior steps.

## Example: book a trip

\`\`\`
1. Reserve flight       → if fails: stop
2. Reserve hotel        → if fails: cancel flight
3. Charge credit card   → if fails: cancel hotel, cancel flight
4. Send confirmation
\`\`\`

Each step talks to a different service. Each step has a **compensation** for unwinding.

## Two flavors

### Choreography

No central coordinator. Each service reacts to events from others.

\`\`\`
[FlightReserved] → HotelService books → [HotelReserved] → BillingService charges
\`\`\`

Pros: simple to start; loose coupling.
Cons: hard to see the whole flow; debugging across services; harder to evolve.

### Orchestration

A central **saga coordinator** drives the flow. Each step sends a command, waits for completion, decides next step.

\`\`\`csharp
public class TripBookingSaga : Saga<TripState>
{
    public async Task Handle(TripRequested cmd)
    {
        State.FlightId = await Send(new ReserveFlight(...));
        State.HotelId  = await Send(new ReserveHotel(...));
        State.PaymentId = await Send(new ChargeCard(...));
        await Publish(new TripBooked(...));
    }

    public async Task Compensate(TripFailed failure)
    {
        if (State.PaymentId != null) await Send(new RefundCard(State.PaymentId));
        if (State.HotelId != null)   await Send(new CancelHotel(State.HotelId));
        if (State.FlightId != null)  await Send(new CancelFlight(State.FlightId));
    }
}
\`\`\`

Pros: centralized, observable, easy to evolve.
Cons: the orchestrator becomes a critical service.

## State machines

Both flavors model state explicitly: \`Pending → FlightReserved → HotelReserved → Charged → Booked\` (or → Compensating). MassTransit and NServiceBus both ship saga frameworks where you declare the state machine and they persist its state.

## Don't

- Don't treat sagas as transactions — there's no rollback, only compensation
- Don't skip idempotency — every step must handle redelivery
- Don't make the orchestrator stateful in process memory — persist state so it survives restarts`,
    },
    {
      id: 'l-ds-4',
      title: 'Orleans, Aspire & friends',
      type: 'theory',
      xp: 20,
      theory: `# Distributed runtimes

For some shapes of distributed system, framework-level help is huge.

## Orleans — virtual actors

Orleans models distributed state as **grains**: tiny, single-threaded, addressable units that the framework auto-distributes and auto-persists.

\`\`\`csharp
public class UserGrain : Grain, IUserGrain
{
    private UserState _state = new();

    public Task<int> GetBalance() => Task.FromResult(_state.Balance);

    public Task Deposit(int amount)
    {
        _state.Balance += amount;
        return Task.CompletedTask;
    }
}

// caller:
var user = client.GetGrain<IUserGrain>("alice");
await user.Deposit(100);
\`\`\`

You don't care which server runs the grain — Orleans routes calls to wherever it lives. Each grain is single-threaded by identity, so no locking needed within one user. Massively simplifies stateful distributed services (game servers, IoT device twins, financial accounts).

## .NET Aspire

A toolkit for **building and orchestrating cloud-native multi-service apps locally**. You declare your services in code:

\`\`\`csharp
var builder = DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("cache");
var pg = builder.AddPostgres("db");

builder.AddProject<Projects.OrderService>("orders")
    .WithReference(pg)
    .WithReference(redis);

builder.AddProject<Projects.WebApp>("web")
    .WithReference(orders);

builder.Build().Run();
\`\`\`

\`dotnet run\` spins up Postgres + Redis + your services + a dashboard at \`localhost:18888\` showing logs / traces / metrics for the whole topology.

For dev loop on multi-service apps, Aspire is a step change. Production deployment can target Kubernetes, Container Apps, etc.

## Dapr

A sidecar runtime that gives every service standard building blocks (state store, pub/sub, secrets, service invocation) over consistent HTTP/gRPC APIs. Polyglot — works with .NET, Go, Python, etc. Useful when you need cross-language services to share patterns.

## What to pick

- **Stateful services with high concurrency** → Orleans (or Akka.NET)
- **Multi-service .NET app development loop** → Aspire
- **Polyglot stack** → Dapr or just OTel + your own broker
- **Single .NET service** → just use ASP.NET Core; you don't need a runtime`,
    },
    {
      id: 'l-ds-5',
      title: 'Distributed Systems Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'A handler processes a "ChargeCard" command. The broker delivers it twice. What protects the customer?',
          options: [
            'The broker guarantees once-only delivery',
            'Idempotency in the handler — usually checked via a unique CommandId',
            '.NET runtime',
            'Nothing — duplicates are inevitable',
          ],
          correctIndex: 1,
          explanation: 'Brokers usually offer "at-least-once" delivery — duplicates happen. Handlers must be idempotent: track CommandId, check before acting.',
        },
        {
          question: 'What problem does the Outbox pattern solve?',
          options: [
            'Slow queries',
            'Atomicity between writing to a DB and publishing to a message broker',
            'Authentication',
            'Memory leaks',
          ],
          correctIndex: 1,
          explanation: 'Outbox: write a row in the same DB transaction as your business change; a separate worker reads & publishes. No partial state where the DB is updated but no message was sent.',
        },
        {
          question: 'In a saga, what happens when step 3 of 5 fails?',
          options: [
            'The whole thing rolls back atomically',
            'Compensating actions undo steps 1 and 2',
            'Step 3 is silently retried forever',
            'Nothing — failure is ignored',
          ],
          correctIndex: 1,
          explanation: 'Sagas can\'t roll back across services — there\'s no distributed transaction. Each completed step has a compensation that undoes its effect.',
        },
        {
          question: 'What is Orleans best at?',
          options: [
            'Stateless web requests',
            'Stateful, single-threaded-per-identity services at scale (game state, IoT twins, accounts)',
            'Cross-language messaging',
            'Local development',
          ],
          correctIndex: 1,
          explanation: 'Orleans grains are virtual actors — addressable, single-threaded, auto-distributed. Great for managing lots of independent state objects without manual sharding.',
        },
        {
          question: 'When should you reach for a message broker instead of HTTP?',
          options: [
            'Always',
            'When you need async work, decoupling, or many subscribers per event',
            'Only for big data',
            'Only on Linux',
          ],
          correctIndex: 1,
          explanation: 'Brokers shine for fire-and-forget work, fan-out to many consumers, and absorbing bursty load. For sync request/response, HTTP/gRPC is simpler.',
        },
      ],
    },
  ],
};

const chMilestone1: Chapter = {
  id: 'ch-milestone-1',
  title: 'Milestone 1: Number Cruncher',
  description: 'Real-world checkpoint after the basics',
  icon: '🏁',
  lessons: [
    {
      id: 'l-m1-intro',
      title: 'Welcome to your first milestone',
      type: 'theory',
      xp: 10,
      theory: `# Milestone Checkpoint

Real engineers don't show up on day one and write microservices — they spend weeks getting **the basics** rock-solid. You've now covered: variables, types, casting, conditionals, loops, methods (with all four parameter modifiers), arrays, strings, and console output.

This milestone bundles three small "real" problems where you'll combine those tools the way you would in a working codebase. They're harder than the per-lesson exercises — closer to the kind of question a manager hands you on a Tuesday morning.

## How a milestone works

- Each problem is a scenario, not a one-line exercise
- Multiple test cases cover edge cases — you have to handle them all
- Hints appear if you click them; the full solution is hidden by default

When all three are passing, you've **earned** moving on.`,
    },
    {
      id: 'l-m1-c1',
      title: 'Range Sum',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'You\'re writing a payroll utility. The accounting team wants the sum of every integer from `low` to `high` (inclusive) that is **divisible by `divisor`**. If `low > high`, return 0. The divisor is always positive.\n\nThe brute-force loop solution is fine — readability over cleverness.',
        difficulty: 'easy',
        examples: [
          { input: '1, 10, 3', output: '18', explanation: '3 + 6 + 9 = 18' },
          { input: '5, 5, 1', output: '5', explanation: 'single value, divisible by 1' },
          { input: '10, 1, 1', output: '0', explanation: 'low > high → 0' },
        ],
        functionName: 'SumDivisibleInRange',
        starterCode: `using System;

public class Solution
{
    public int SumDivisibleInRange(int low, int high, int divisor)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int SumDivisibleInRange(int low, int high, int divisor)
    {
        if (low > high) return 0;
        int total = 0;
        for (int i = low; i <= high; i++)
            if (i % divisor == 0) total += i;
        return total;
    }
}`,
        testCases: [
          { input: '1, 10, 3', expected: '18', description: '1..10 div by 3 → 18' },
          { input: '1, 100, 7', expected: '735', description: '1..100 div by 7 → 735' },
          { input: '5, 5, 1', expected: '5', description: 'single value' },
          { input: '10, 1, 1', expected: '0', description: 'low > high' },
          { input: '-10, 10, 5', expected: '0', description: 'negatives + zero (cancel out)' },
          { input: '1, 1000, 13', expected: '38038', description: 'larger range' },
        ],
        hints: [
          'Handle the `low > high` case first by returning 0',
          'Walk i from low to high inclusive; if `i % divisor == 0`, add to a running total',
          'Initialize the total to 0 BEFORE the loop',
        ],
      },
    },
    {
      id: 'l-m1-c2',
      title: 'Longest Increasing Streak',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'A monitoring service receives an array of CPU readings every minute. You need the **length of the longest run of strictly increasing values**.\n\nA single value counts as a streak of 1. An empty array returns 0.',
        difficulty: 'medium',
        examples: [
          { input: '[1, 2, 3, 1, 5, 6, 7, 8, 4]', output: '5', explanation: 'The run 1,5,6,7,8 has length 5' },
          { input: '[5]', output: '1' },
          { input: '[]', output: '0' },
          { input: '[5, 4, 3, 2]', output: '1', explanation: 'No increases at all' },
        ],
        functionName: 'LongestIncreasingStreak',
        starterCode: `using System;

public class Solution
{
    public int LongestIncreasingStreak(int[] readings)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int LongestIncreasingStreak(int[] readings)
    {
        if (readings.Length == 0) return 0;
        int best = 1;
        int current = 1;
        for (int i = 1; i < readings.Length; i++)
        {
            if (readings[i] > readings[i - 1])
            {
                current++;
                if (current > best) best = current;
            }
            else
            {
                current = 1;
            }
        }
        return best;
    }
}`,
        testCases: [
          { input: '[1, 2, 3, 1, 5, 6, 7, 8, 4]', expected: '5', description: 'Longest run is 1,5,6,7,8' },
          { input: '[5]', expected: '1', description: 'Single element' },
          { input: '[]', expected: '0', description: 'Empty' },
          { input: '[5, 4, 3, 2]', expected: '1', description: 'All decreasing' },
          { input: '[1, 1, 1, 1]', expected: '1', description: 'All equal (NOT strictly increasing)' },
          { input: '[1, 2, 3, 4, 5]', expected: '5', description: 'Already sorted ascending' },
          { input: '[10, 1, 2, 3, 0, 4, 5, 6, 7]', expected: '5', description: 'Best run at the end' },
        ],
        hints: [
          'Walk the array starting at index 1, tracking `current` (current streak) and `best` (longest seen)',
          'Compare arr[i] to arr[i-1]: greater means current++; otherwise reset current to 1',
          'Update best when current exceeds it. Don\'t forget the empty-array case',
        ],
      },
    },
    {
      id: 'l-m1-c3',
      title: 'Centered Pyramid',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'For a UI graphic, render a centered pyramid of `*` characters as a single string.\n\nFor height `n`:\n- Row `i` (1-based) has `2i - 1` stars\n- Each row is padded with spaces on the LEFT so that all rows align on a common axis\n- Rows are separated by `\\n` (no trailing newline)\n\nFor `n = 3`:\n```\n  *\n ***\n*****\n```\n\nFor `n = 0`, return an empty string.',
        difficulty: 'medium',
        examples: [
          { input: '3', output: '  *\\n ***\\n*****' },
          { input: '1', output: '*' },
          { input: '0', output: '' },
        ],
        functionName: 'Pyramid',
        starterCode: `using System;
using System.Text;

public class Solution
{
    public string Pyramid(int height)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;
using System.Text;

public class Solution
{
    public string Pyramid(int height)
    {
        if (height <= 0) return "";
        var sb = new StringBuilder();
        for (int i = 1; i <= height; i++)
        {
            int stars = 2 * i - 1;
            int pad = height - i;
            sb.Append(' ', pad);
            sb.Append('*', stars);
            if (i < height) sb.Append('\\n');
        }
        return sb.ToString();
    }
}`,
        testCases: [
          { input: '3', expected: '  *\n ***\n*****', description: 'Height 3' },
          { input: '1', expected: '*', description: 'Single row' },
          { input: '0', expected: '', description: 'Empty' },
          { input: '5', expected: '    *\n   ***\n  *****\n *******\n*********', description: 'Height 5' },
          { input: '-2', expected: '', description: 'Negative → empty' },
        ],
        hints: [
          'Use a StringBuilder — concatenating in a loop with `+` is wasteful',
          'For row i: pad = height - i spaces, stars = 2i - 1',
          '`sb.Append(\' \', count)` and `sb.Append(\'*\', count)` write a char N times',
          'Append `\\n` after each row EXCEPT the last',
        ],
      },
    },
  ],
};

const chMilestone2: Chapter = {
  id: 'ch-milestone-2',
  title: 'Milestone 2: Library System',
  description: 'OOP checkpoint - design a small system',
  icon: '📚',
  lessons: [
    {
      id: 'l-m2-intro',
      title: 'OOP Milestone',
      type: 'theory',
      xp: 10,
      theory: `# Milestone 2 — Real OOP

You've learned classes, fields, properties, constructors, inheritance, polymorphism, and interfaces. Now you'll combine them.

## The scenario

You're joining a small team that's building a library management system. Items in the catalog can be Books, DVDs, or Magazines. The team has agreed on:

- An abstract base type \`LibraryItem\` with a virtual \`Description()\` method
- Concrete types \`Book\`, \`Dvd\`, \`Magazine\` that override Description differently
- An \`ILoanable\` interface that Books and DVDs implement (Magazines don't leave the building)

Each catalog entry comes in as a string in a known format. Your code parses each, instantiates the right concrete type, and processes the catalog using polymorphism.

## Format spec

Catalog entries are pipe-separated:
- Books: \`BOOK|Title|Author\`
- DVDs: \`DVD|Title|Minutes\`
- Magazines: \`MAG|Title|IssueNumber\`

Three challenges follow. They're tied — your class hierarchy from challenge 2.1 will work for 2.2 and 2.3.`,
    },
    {
      id: 'l-m2-c1',
      title: 'Polymorphic Descriptions',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Implement a class hierarchy and a method `string[] DescribeAll(string[] entries)` that returns a description per entry.\n\nFormat by type:\n- BOOK: `Book "Title" by Author`\n- DVD: `DVD "Title" (Nmin)`\n- MAG: `Magazine "Title" issue N`\n\nUse an abstract `LibraryItem` with a virtual `Description()` so the dispatch is polymorphic — the test will still pass if you cheat with switch on the type prefix, but the spirit of this milestone is OOP.',
        difficulty: 'medium',
        examples: [
          { input: '["BOOK|Dune|Herbert", "DVD|Inception|148", "MAG|TIME|42"]', output: '["Book \\"Dune\\" by Herbert", "DVD \\"Inception\\" (148min)", "Magazine \\"TIME\\" issue 42"]' },
          { input: '[]', output: '[]' },
        ],
        functionName: 'DescribeAll',
        starterCode: `using System;

abstract class LibraryItem
{
    public string Title;
    public abstract string Description();
}

class Book : LibraryItem
{
    public string Author;
    public override string Description() => "";  // implement
}

class Dvd : LibraryItem
{
    public int Minutes;
    public override string Description() => "";  // implement
}

class Magazine : LibraryItem
{
    public int Issue;
    public override string Description() => "";  // implement
}

public class Solution
{
    public string[] DescribeAll(string[] entries)
    {
        // Parse each entry, instantiate the right type, call Description()
        return new string[0];
    }
}`,
        solution: `using System;

abstract class LibraryItem
{
    public string Title;
    public abstract string Description();
}

class Book : LibraryItem
{
    public string Author;
    public override string Description() => "Book \\"" + Title + "\\" by " + Author;
}

class Dvd : LibraryItem
{
    public int Minutes;
    public override string Description() => "DVD \\"" + Title + "\\" (" + Minutes + "min)";
}

class Magazine : LibraryItem
{
    public int Issue;
    public override string Description() => "Magazine \\"" + Title + "\\" issue " + Issue;
}

public class Solution
{
    public string[] DescribeAll(string[] entries)
    {
        var result = new string[entries.Length];
        for (int i = 0; i < entries.Length; i++)
        {
            var parts = entries[i].Split('|');
            LibraryItem item;
            if (parts[0] == "BOOK") item = new Book { Title = parts[1], Author = parts[2] };
            else if (parts[0] == "DVD") item = new Dvd { Title = parts[1], Minutes = int.Parse(parts[2]) };
            else item = new Magazine { Title = parts[1], Issue = int.Parse(parts[2]) };
            result[i] = item.Description();
        }
        return result;
    }
}`,
        testCases: [
          {
            input: '["BOOK|Dune|Herbert", "DVD|Inception|148", "MAG|TIME|42"]',
            expected: '["Book "Dune" by Herbert", "DVD "Inception" (148min)", "Magazine "TIME" issue 42"]',
            description: 'One of each type'
          },
          {
            input: '[]',
            expected: '[]',
            description: 'Empty catalog'
          },
          {
            input: '["BOOK|1984|Orwell"]',
            expected: '["Book "1984" by Orwell"]',
            description: 'Single book'
          },
          {
            input: '["DVD|Heat|171", "DVD|Up|96"]',
            expected: '["DVD "Heat" (171min)", "DVD "Up" (96min)"]',
            description: 'Two DVDs'
          },
        ],
        hints: [
          'Split each entry by `|` to get the parts',
          'parts[0] is the type discriminator. Use `if/else` (not switch with type pattern — sandbox limitation)',
          'In Description(), build the string with concatenation and embed the title inside escaped quotes',
        ],
      },
    },
    {
      id: 'l-m2-c2',
      title: 'Loanable Filter',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Magazines stay in the library. Books and DVDs can be loaned out.\n\nImplement an `ILoanable` interface and have `Book` and `Dvd` implement it (`Magazine` does not). Then implement `string[] LoanableTitles(string[] entries)` that returns ONLY the titles of loanable items, in the original order.',
        difficulty: 'medium',
        examples: [
          { input: '["BOOK|Dune|Herbert", "MAG|TIME|42", "DVD|Heat|171"]', output: '["Dune", "Heat"]', explanation: 'Magazine excluded' },
          { input: '["MAG|TIME|1", "MAG|National Geographic|2"]', output: '[]' },
        ],
        functionName: 'LoanableTitles',
        starterCode: `using System;
using System.Collections.Generic;

interface ILoanable { }   // marker interface

abstract class LibraryItem { public string Title; }

// Make Book and Dvd implement ILoanable; not Magazine
class Book : LibraryItem, ILoanable { public string Author; }
class Dvd  : LibraryItem, ILoanable { public int Minutes; }
class Magazine : LibraryItem { public int Issue; }

public class Solution
{
    public string[] LoanableTitles(string[] entries)
    {
        // Parse each entry; if it's ILoanable, keep its title
        return new string[0];
    }
}`,
        solution: `using System;
using System.Collections.Generic;

interface ILoanable { }

abstract class LibraryItem { public string Title; }

class Book : LibraryItem, ILoanable { public string Author; }
class Dvd  : LibraryItem, ILoanable { public int Minutes; }
class Magazine : LibraryItem { public int Issue; }

public class Solution
{
    public string[] LoanableTitles(string[] entries)
    {
        var result = new List<string>();
        foreach (var e in entries)
        {
            var parts = e.Split('|');
            LibraryItem item;
            if (parts[0] == "BOOK") item = new Book { Title = parts[1], Author = parts[2] };
            else if (parts[0] == "DVD") item = new Dvd { Title = parts[1], Minutes = int.Parse(parts[2]) };
            else item = new Magazine { Title = parts[1], Issue = int.Parse(parts[2]) };
            if (item is ILoanable) result.Add(item.Title);
        }
        return result.ToArray();
    }
}`,
        testCases: [
          { input: '["BOOK|Dune|Herbert", "MAG|TIME|42", "DVD|Heat|171"]', expected: '["Dune", "Heat"]', description: 'Mixed types' },
          { input: '["MAG|TIME|1", "MAG|National Geographic|2"]', expected: '[]', description: 'All magazines' },
          { input: '["BOOK|1984|Orwell"]', expected: '["1984"]', description: 'Single book' },
          { input: '[]', expected: '[]', description: 'Empty' },
          { input: '["DVD|Up|96", "BOOK|Dune|Herbert", "DVD|Heat|171", "MAG|TIME|42"]', expected: '["Up", "Dune", "Heat"]', description: 'Order preserved' },
        ],
        hints: [
          'After instantiating the right type, test `if (item is ILoanable)` to filter',
          'Use a List<string> as you walk; convert to array at the end with .ToArray()',
          'The order of results matches the input — don\'t sort',
        ],
      },
    },
    {
      id: 'l-m2-c3',
      title: 'Books by Author',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Implement `int CountBooksByAuthor(string[] entries, string author)` — count how many BOOK entries have an exact (case-sensitive) matching author. Ignore non-BOOK entries.',
        difficulty: 'easy',
        examples: [
          { input: '["BOOK|Dune|Herbert", "BOOK|Children of Dune|Herbert", "DVD|x|10"], "Herbert"', output: '2' },
          { input: '["MAG|x|1"], "Anyone"', output: '0' },
        ],
        functionName: 'CountBooksByAuthor',
        starterCode: `using System;

public class Solution
{
    public int CountBooksByAuthor(string[] entries, string author)
    {
        // your code here
        return 0;
    }
}`,
        solution: `using System;

public class Solution
{
    public int CountBooksByAuthor(string[] entries, string author)
    {
        int count = 0;
        foreach (var e in entries)
        {
            var parts = e.Split('|');
            if (parts.Length >= 3 && parts[0] == "BOOK" && parts[2] == author)
                count++;
        }
        return count;
    }
}`,
        testCases: [
          { input: '["BOOK|Dune|Herbert", "BOOK|Children of Dune|Herbert", "DVD|x|10"], "Herbert"', expected: '2', description: 'Two by Herbert' },
          { input: '["MAG|x|1"], "Anyone"', expected: '0', description: 'No books' },
          { input: '[], "Herbert"', expected: '0', description: 'Empty input' },
          { input: '["BOOK|A|herbert"], "Herbert"', expected: '0', description: 'Case sensitive (no match)' },
          { input: '["BOOK|A|Herbert", "BOOK|B|Asimov", "BOOK|C|Herbert"], "Herbert"', expected: '2', description: 'Mixed authors' },
        ],
        hints: [
          'Split each entry by `|`',
          'Only count when parts[0] == "BOOK" AND parts[2] == author',
          'Case-sensitive comparison — string `==` is exact in C#',
        ],
      },
    },
  ],
};

const chMilestone3: Chapter = {
  id: 'ch-milestone-3',
  title: 'Milestone 3: Sales Report',
  description: 'Data engineering checkpoint - LINQ on real records',
  icon: '📈',
  lessons: [
    {
      id: 'l-m3-intro',
      title: 'Data engineering milestone',
      type: 'theory',
      xp: 10,
      theory: `# Milestone 3 — Sales Report

You now know LINQ inside-out: filtering, projection, grouping, aggregation, joining. This milestone takes raw data and turns it into a report — exactly the kind of work data-shaped services do constantly.

## The scenario

You're building a daily sales summary for a small e-commerce shop. The raw input is an array of strings, each a single sale in this format:

\`\`\`
YYYY-MM-DD|Customer|Amount
\`\`\`

For example: \`"2026-01-15|Alice|49.99"\`

Three deliverables:
1. **Top customers** — names of the top K by total spend
2. **Daily averages** — average sale per date
3. **Best day** — single day with highest total

All three lean on \`GroupBy\` + an aggregator. You'll lean on \`InvariantCulture\` for stable decimal formatting.`,
    },
    {
      id: 'l-m3-c1',
      title: 'Top Customers by Spend',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Given a list of sales (`"DATE|Customer|Amount"`), return the names of the top **K customers** by total spend in **descending** order. Break ties **alphabetically** ascending. If K is larger than the number of distinct customers, return all of them.\n\nAmounts use a dot decimal separator (`49.99`).',
        difficulty: 'medium',
        examples: [
          { input: '["2026-01-01|Alice|100", "2026-01-02|Bob|50", "2026-01-03|Alice|75"], 1', output: '["Alice"]', explanation: 'Alice = 175, Bob = 50' },
          { input: '["2026-01-01|A|100", "2026-01-02|B|100"], 2', output: '["A", "B"]', explanation: 'Tied — alphabetical' },
        ],
        functionName: 'TopCustomers',
        starterCode: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string[] TopCustomers(string[] sales, int k)
    {
        // your code here
        return new string[0];
    }
}`,
        solution: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string[] TopCustomers(string[] sales, int k)
    {
        return sales
            .Select(s => s.Split('|'))
            .Select(p => new { Name = p[1], Amount = decimal.Parse(p[2], CultureInfo.InvariantCulture) })
            .GroupBy(x => x.Name)
            .Select(g => new { Name = g.Key, Total = g.Sum(x => x.Amount) })
            .OrderByDescending(x => x.Total)
            .ThenBy(x => x.Name)
            .Take(k)
            .Select(x => x.Name)
            .ToArray();
    }
}`,
        testCases: [
          { input: '["2026-01-01|Alice|100", "2026-01-02|Bob|50", "2026-01-03|Alice|75"], 1', expected: '["Alice"]', description: 'Top 1' },
          { input: '["2026-01-01|A|100", "2026-01-02|B|100"], 2', expected: '["A", "B"]', description: 'Tie alphabetical' },
          { input: '["2026-01-01|A|100"], 5', expected: '["A"]', description: 'k > distinct' },
          { input: '["2026-01-01|Z|10", "2026-01-02|A|10", "2026-01-03|M|10"], 3', expected: '["A", "M", "Z"]', description: 'All tied → alphabetical' },
          { input: '["2026-01-01|Alice|49.99", "2026-01-02|Alice|50.01", "2026-01-03|Bob|99"], 2', expected: '["Alice", "Bob"]', description: 'Decimals (Alice=100.00, Bob=99)' },
        ],
        hints: [
          'Split each line by `|`; build an anonymous object with name + parsed amount',
          'GroupBy(x => x.Name), then project { Name, Total = Sum }',
          'OrderByDescending(x => x.Total).ThenBy(x => x.Name) — tie-break alphabetical',
          'Use `decimal.Parse(s, CultureInfo.InvariantCulture)` to handle the dot decimal',
        ],
      },
    },
    {
      id: 'l-m3-c2',
      title: 'Daily Average',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'For each unique date in the sales data, compute the **average sale amount** and return as `"YYYY-MM-DD:avg"` lines, sorted ascending by date.\n\nFormat the average with **2 decimals**, using `CultureInfo.InvariantCulture` so the decimal separator is `.` regardless of host locale.',
        difficulty: 'medium',
        examples: [
          { input: '["2026-01-01|A|100", "2026-01-01|B|50", "2026-01-02|C|75"]', output: '["2026-01-01:75.00", "2026-01-02:75.00"]' },
          { input: '["2026-01-15|A|49.99"]', output: '["2026-01-15:49.99"]' },
        ],
        functionName: 'DailyAverages',
        starterCode: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string[] DailyAverages(string[] sales)
    {
        // your code here
        return new string[0];
    }
}`,
        solution: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string[] DailyAverages(string[] sales)
    {
        return sales
            .Select(s => s.Split('|'))
            .Select(p => new { Date = p[0], Amount = decimal.Parse(p[2], CultureInfo.InvariantCulture) })
            .GroupBy(x => x.Date)
            .OrderBy(g => g.Key)
            .Select(g => g.Key + ":" + g.Average(x => x.Amount).ToString("F2", CultureInfo.InvariantCulture))
            .ToArray();
    }
}`,
        testCases: [
          { input: '["2026-01-01|A|100", "2026-01-01|B|50", "2026-01-02|C|75"]', expected: '["2026-01-01:75.00", "2026-01-02:75.00"]', description: 'Two dates with averages' },
          { input: '["2026-01-15|A|49.99"]', expected: '["2026-01-15:49.99"]', description: 'Single sale' },
          { input: '[]', expected: '[]', description: 'No sales' },
          { input: '["2026-03-01|A|10", "2026-02-01|B|20", "2026-01-01|C|30"]', expected: '["2026-01-01:30.00", "2026-02-01:20.00", "2026-03-01:10.00"]', description: 'Order by date ascending' },
        ],
        hints: [
          'Group by Date, then for each group call Average(x => x.Amount)',
          'Format each average with .ToString("F2", CultureInfo.InvariantCulture) so 75 prints as "75.00"',
          'OrderBy(g => g.Key) sorts ISO dates correctly because they\'re already lexicographically sortable',
        ],
      },
    },
    {
      id: 'l-m3-c3',
      title: 'Best Day',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Find the date with the **highest total sales**. Return as a single string `"YYYY-MM-DD:total"` (total formatted with 2 decimals, InvariantCulture).\n\nIf two dates tie, return the **earlier** date.\n\nReturn an empty string if there are no sales.',
        difficulty: 'easy',
        examples: [
          { input: '["2026-01-01|A|100", "2026-01-02|B|50", "2026-01-02|C|60"]', output: '2026-01-02:110.00', explanation: 'Day 2 totals 110, day 1 totals 100' },
          { input: '[]', output: '' },
        ],
        functionName: 'BestDay',
        starterCode: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string BestDay(string[] sales)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;
using System.Linq;
using System.Globalization;

public class Solution
{
    public string BestDay(string[] sales)
    {
        if (sales.Length == 0) return "";
        var best = sales
            .Select(s => s.Split('|'))
            .Select(p => new { Date = p[0], Amount = decimal.Parse(p[2], CultureInfo.InvariantCulture) })
            .GroupBy(x => x.Date)
            .Select(g => new { Date = g.Key, Total = g.Sum(x => x.Amount) })
            .OrderByDescending(x => x.Total)
            .ThenBy(x => x.Date)
            .First();
        return best.Date + ":" + best.Total.ToString("F2", CultureInfo.InvariantCulture);
    }
}`,
        testCases: [
          { input: '["2026-01-01|A|100", "2026-01-02|B|50", "2026-01-02|C|60"]', expected: '2026-01-02:110.00', description: 'Day 2 wins' },
          { input: '[]', expected: '', description: 'Empty' },
          { input: '["2026-01-01|A|50", "2026-01-02|B|50"]', expected: '2026-01-01:50.00', description: 'Tie → earlier date' },
          { input: '["2026-05-06|X|9999.99"]', expected: '2026-05-06:9999.99', description: 'Single sale' },
        ],
        hints: [
          'Group by Date, sum amount per group',
          'OrderByDescending by total, ThenBy date (asc) for tie-break',
          'First() picks the top group; format Date + ":" + total.ToString("F2", invariant)',
          'Don\'t forget the empty-input case',
        ],
      },
    },
  ],
};

const chFinalCapstone: Chapter = {
  id: 'ch-final-capstone',
  title: 'Final Capstone: Order Engine',
  description: 'Comprehensive evaluation - everything you have learned',
  icon: '🎓',
  lessons: [
    {
      id: 'l-fin-intro',
      title: 'The Capstone',
      type: 'theory',
      xp: 20,
      theory: `# Final Capstone

You've come a long way — basics, OOP, generics, LINQ, async, patterns, ecosystem. Time to bring it all together.

## The scenario

You've been brought in as a contractor for a small online store. Their order pipeline is held together with duct tape — they need it rebuilt with proper validation, totals, customer reporting, and invoice formatting. Five progressive challenges follow.

## The data format

An **order** is a single string in this format:

\`\`\`
CustomerName|qty1:price1,qty2:price2,...
\`\`\`

For example: \`"Alice|2:9.99,1:14.50"\` — Alice bought 2 items at $9.99 and 1 item at $14.50.

- Quantities are positive integers
- Prices are decimals with \`.\` separator
- Customer names contain only letters and spaces (no commas, no pipes)
- Lines may be missing or zero-quantity in **invalid** orders — your validator catches them

## Discount tier

For total calculations:
- subtotal < 100 → 0% discount
- 100 ≤ subtotal < 500 → 5% discount
- subtotal ≥ 500 → 10% discount

Total = subtotal × (1 - discount).

## Five challenges

1. \`IsValidOrder(string order)\` — basic validation
2. \`OrderTotal(string order)\` — apply discount tier
3. \`BestCustomer(string[] orders)\` — total per customer, return name with highest total
4. \`FormatInvoice(string order)\` — produce a multi-line invoice string
5. \`CustomerSummary(string[] orders)\` — full report, alphabetical by name

Pass all five and you've completed the path.`,
    },
    {
      id: 'l-fin-c1',
      title: 'Validate Order',
      type: 'challenge',
      xp: 50,
      challenge: {
        description: 'Return `true` if the order is valid, `false` otherwise. An order is valid when:\n\n- The customer name is non-empty\n- At least one line is present\n- Every line has a positive integer quantity AND a positive decimal price\n\nMalformed input (missing pipe, bad numbers, empty lines) should return false (don\'t throw).',
        difficulty: 'easy',
        examples: [
          { input: '"Alice|2:9.99,1:14.50"', output: 'True' },
          { input: '"|2:9.99"', output: 'False', explanation: 'Empty name' },
          { input: '"Alice|"', output: 'False', explanation: 'No lines' },
          { input: '"Alice|0:9.99"', output: 'False', explanation: 'Zero quantity' },
          { input: '"Alice|2:-1"', output: 'False', explanation: 'Negative price' },
        ],
        functionName: 'IsValidOrder',
        starterCode: `using System;
using System.Globalization;

public class Solution
{
    public bool IsValidOrder(string order)
    {
        // your code here
        return false;
    }
}`,
        solution: `using System;
using System.Globalization;

public class Solution
{
    public bool IsValidOrder(string order)
    {
        if (string.IsNullOrEmpty(order)) return false;
        var parts = order.Split('|');
        if (parts.Length != 2) return false;
        if (string.IsNullOrEmpty(parts[0])) return false;
        if (string.IsNullOrEmpty(parts[1])) return false;

        var lines = parts[1].Split(',');
        if (lines.Length == 0) return false;
        foreach (var line in lines)
        {
            var qp = line.Split(':');
            if (qp.Length != 2) return false;
            if (!int.TryParse(qp[0], out int qty) || qty <= 0) return false;
            if (!decimal.TryParse(qp[1], NumberStyles.Number, CultureInfo.InvariantCulture, out decimal price) || price <= 0m) return false;
        }
        return true;
    }
}`,
        testCases: [
          { input: '"Alice|2:9.99,1:14.50"', expected: 'True', description: 'Valid order' },
          { input: '"|2:9.99"', expected: 'False', description: 'Empty name' },
          { input: '"Alice|"', expected: 'False', description: 'No lines' },
          { input: '"Alice|0:9.99"', expected: 'False', description: 'Zero qty' },
          { input: '"Alice|2:-1"', expected: 'False', description: 'Negative price' },
          { input: '"Alice|2:9.99,bad"', expected: 'False', description: 'Malformed line' },
          { input: '"Alice|1:0.01"', expected: 'True', description: 'Tiny but positive price' },
          { input: '"Bob|3:5,2:10,1:1"', expected: 'True', description: 'Three lines' },
        ],
        hints: [
          'Split by `|` first to get [name, lines]',
          'Use `int.TryParse` and `decimal.TryParse` so bad input returns false instead of throwing',
          'For decimals, pass `NumberStyles.Number, CultureInfo.InvariantCulture`',
          'Reject zero/negative quantities and prices',
        ],
      },
    },
    {
      id: 'l-fin-c2',
      title: 'Order Total with Discount',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Compute the total of an order after applying the discount tier:\n\n- subtotal < 100 → 0%\n- 100 ≤ subtotal < 500 → 5%\n- subtotal ≥ 500 → 10%\n\nTotal = subtotal × (1 − discount). Return as a string formatted to **2 decimals** using `InvariantCulture`.\n\nAssume the input is valid (you don\'t need to revalidate).',
        difficulty: 'medium',
        examples: [
          { input: '"Alice|1:50.00"', output: '50.00', explanation: 'Below 100 → no discount' },
          { input: '"Alice|2:60.00"', output: '114.00', explanation: '120 × 0.95 = 114' },
          { input: '"Alice|10:60.00"', output: '540.00', explanation: '600 × 0.9 = 540' },
        ],
        functionName: 'OrderTotal',
        starterCode: `using System;
using System.Globalization;

public class Solution
{
    public string OrderTotal(string order)
    {
        // your code here
        return "0.00";
    }
}`,
        solution: `using System;
using System.Globalization;

public class Solution
{
    public string OrderTotal(string order)
    {
        var parts = order.Split('|');
        decimal subtotal = 0m;
        foreach (var line in parts[1].Split(','))
        {
            var qp = line.Split(':');
            int qty = int.Parse(qp[0]);
            decimal price = decimal.Parse(qp[1], CultureInfo.InvariantCulture);
            subtotal += qty * price;
        }
        decimal discount = 0m;
        if (subtotal >= 500m) discount = 0.10m;
        else if (subtotal >= 100m) discount = 0.05m;
        decimal total = subtotal * (1m - discount);
        return total.ToString("F2", CultureInfo.InvariantCulture);
    }
}`,
        testCases: [
          { input: '"Alice|1:50.00"', expected: '50.00', description: 'Under 100 — no discount' },
          { input: '"Alice|2:60.00"', expected: '114.00', description: '120 → 5% off' },
          { input: '"Alice|10:60.00"', expected: '540.00', description: '600 → 10% off' },
          { input: '"Bob|2:50.00,1:25.00"', expected: '118.75', description: '125 → 5% off' },
          { input: '"Carol|1:99.99"', expected: '99.99', description: '99.99 → no discount' },
          { input: '"Dan|1:100.00"', expected: '95.00', description: '100 → 5% boundary' },
          { input: '"Eve|1:500.00"', expected: '450.00', description: '500 → 10% boundary' },
        ],
        hints: [
          'Walk lines, accumulate subtotal = sum(qty * price)',
          'Choose discount: ≥500 → 0.10, ≥100 → 0.05, else 0',
          'total = subtotal * (1 - discount); format with .ToString("F2", InvariantCulture)',
          'Use decimal (not double) — money never likes floating-point rounding',
        ],
      },
    },
    {
      id: 'l-fin-c3',
      title: 'Best Customer',
      type: 'challenge',
      xp: 60,
      challenge: {
        description: 'Given many orders, return the **name of the customer with the highest total spend** (after discounts). If two customers tie, return the alphabetically earlier name. Return empty string if no orders.\n\nReuse your discount logic from challenge 2 — a single customer may have multiple orders.',
        difficulty: 'medium',
        examples: [
          { input: '["Alice|2:60.00", "Bob|1:50.00", "Alice|1:50.00"]', output: 'Alice', explanation: 'Alice: 120→114 + 50 = 164. Bob: 50.' },
          { input: '[]', output: '' },
        ],
        functionName: 'BestCustomer',
        starterCode: `using System;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;

public class Solution
{
    public string BestCustomer(string[] orders)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;

public class Solution
{
    public string BestCustomer(string[] orders)
    {
        if (orders.Length == 0) return "";
        var totals = new Dictionary<string, decimal>();
        foreach (var o in orders)
        {
            var parts = o.Split('|');
            string name = parts[0];
            decimal subtotal = 0m;
            foreach (var line in parts[1].Split(','))
            {
                var qp = line.Split(':');
                subtotal += int.Parse(qp[0]) * decimal.Parse(qp[1], CultureInfo.InvariantCulture);
            }
            decimal discount = subtotal >= 500m ? 0.10m : subtotal >= 100m ? 0.05m : 0m;
            decimal total = subtotal * (1m - discount);
            if (totals.ContainsKey(name)) totals[name] += total;
            else totals[name] = total;
        }
        return totals
            .OrderByDescending(kv => kv.Value)
            .ThenBy(kv => kv.Key)
            .First()
            .Key;
    }
}`,
        testCases: [
          { input: '["Alice|2:60.00", "Bob|1:50.00", "Alice|1:50.00"]', expected: 'Alice', description: 'Alice wins overall' },
          { input: '[]', expected: '', description: 'Empty' },
          { input: '["A|1:50", "B|1:50"]', expected: 'A', description: 'Tie → alphabetical' },
          { input: '["Z|1:1000", "A|1:10"]', expected: 'Z', description: 'Z wins by total' },
          { input: '["Solo|2:100"]', expected: 'Solo', description: 'Single order' },
        ],
        hints: [
          'Use a Dictionary<string, decimal> mapping customer name → running total',
          'For each order: compute total (subtotal − discount) and accumulate to the customer\'s entry',
          'Pick the winner with OrderByDescending(value).ThenBy(name).First().Key',
        ],
      },
    },
    {
      id: 'l-fin-c4',
      title: 'Format Invoice',
      type: 'challenge',
      xp: 70,
      challenge: {
        description: 'Format a single order as a multi-line invoice string. Format:\n\n```\nInvoice for: <CustomerName>\n- <qty>x @<price>: <subtotal>\n- <qty>x @<price>: <subtotal>\n...\nSubtotal: <subtotal>\nDiscount: <discount>%\nTotal:    <total>\n```\n\n- Each money value formatted with 2 decimals (InvariantCulture)\n- Discount value is the percentage as a whole number (0, 5, or 10)\n- Note the alignment: "Total:" is followed by **4 spaces** (so it lines up with "Subtotal:" + 1 space)\n- Lines separated by `\\n`, no trailing newline',
        difficulty: 'hard',
        examples: [
          { input: '"Alice|2:60.00"', output: 'Invoice for: Alice\\n- 2x @60.00: 120.00\\nSubtotal: 120.00\\nDiscount: 5%\\nTotal:    114.00' },
        ],
        functionName: 'FormatInvoice',
        starterCode: `using System;
using System.Text;
using System.Globalization;

public class Solution
{
    public string FormatInvoice(string order)
    {
        // your code here
        return "";
    }
}`,
        solution: `using System;
using System.Text;
using System.Globalization;

public class Solution
{
    public string FormatInvoice(string order)
    {
        var parts = order.Split('|');
        string name = parts[0];
        var sb = new StringBuilder();
        sb.Append("Invoice for: ").Append(name).Append('\\n');
        decimal subtotal = 0m;
        foreach (var line in parts[1].Split(','))
        {
            var qp = line.Split(':');
            int qty = int.Parse(qp[0]);
            decimal price = decimal.Parse(qp[1], CultureInfo.InvariantCulture);
            decimal lineTotal = qty * price;
            subtotal += lineTotal;
            sb.Append("- ").Append(qty).Append("x @")
              .Append(price.ToString("F2", CultureInfo.InvariantCulture))
              .Append(": ")
              .Append(lineTotal.ToString("F2", CultureInfo.InvariantCulture))
              .Append('\\n');
        }
        int discountPct = subtotal >= 500m ? 10 : subtotal >= 100m ? 5 : 0;
        decimal total = subtotal * (1m - discountPct / 100m);
        sb.Append("Subtotal: ").Append(subtotal.ToString("F2", CultureInfo.InvariantCulture)).Append('\\n');
        sb.Append("Discount: ").Append(discountPct).Append("%").Append('\\n');
        sb.Append("Total:    ").Append(total.ToString("F2", CultureInfo.InvariantCulture));
        return sb.ToString();
    }
}`,
        testCases: [
          {
            input: '"Alice|2:60.00"',
            expected: 'Invoice for: Alice\n- 2x @60.00: 120.00\nSubtotal: 120.00\nDiscount: 5%\nTotal:    114.00',
            description: 'Single line, 5% discount',
          },
          {
            input: '"Bob|1:50.00"',
            expected: 'Invoice for: Bob\n- 1x @50.00: 50.00\nSubtotal: 50.00\nDiscount: 0%\nTotal:    50.00',
            description: 'No discount',
          },
          {
            input: '"Carol|10:60.00,5:10.00"',
            expected: 'Invoice for: Carol\n- 10x @60.00: 600.00\n- 5x @10.00: 50.00\nSubtotal: 650.00\nDiscount: 10%\nTotal:    585.00',
            description: 'Multiple lines, 10%',
          },
        ],
        hints: [
          'Use StringBuilder; append a `\\n` after each line EXCEPT the last',
          'Format every money value with .ToString("F2", InvariantCulture)',
          '"Subtotal: " has 1 space; "Total:" needs 4 spaces to line up with Subtotal\'s `:` + space',
          'Discount prints as a whole percent: 0, 5, or 10 — no decimals',
        ],
      },
    },
    {
      id: 'l-fin-c5',
      title: 'Customer Summary',
      type: 'challenge',
      xp: 80,
      challenge: {
        description: 'Final boss. Given many orders, produce one summary line per **distinct** customer in the format:\n\n```\n<Name>: $<total> (<n> orders)\n```\n\n- Total formatted with 2 decimals (InvariantCulture); apply the per-order discount tier before summing\n- Customers in **alphabetical order**\n- One distinct customer per output line, regardless of how many orders they placed\n\nReturn the lines as a `string[]`.',
        difficulty: 'hard',
        examples: [
          {
            input: '["Alice|2:60.00", "Bob|1:50.00", "Alice|1:50.00"]',
            output: '["Alice: $164.00 (2 orders)", "Bob: $50.00 (1 orders)"]',
            explanation: 'Alice: 114 + 50 = 164. Bob: 50.',
          },
          { input: '[]', output: '[]' },
        ],
        functionName: 'CustomerSummary',
        starterCode: `using System;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;

public class Solution
{
    public string[] CustomerSummary(string[] orders)
    {
        // your code here
        return new string[0];
    }
}`,
        solution: `using System;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;

public class Solution
{
    public string[] CustomerSummary(string[] orders)
    {
        var totals = new Dictionary<string, decimal>();
        var counts = new Dictionary<string, int>();

        foreach (var o in orders)
        {
            var parts = o.Split('|');
            string name = parts[0];
            decimal subtotal = 0m;
            foreach (var line in parts[1].Split(','))
            {
                var qp = line.Split(':');
                subtotal += int.Parse(qp[0]) * decimal.Parse(qp[1], CultureInfo.InvariantCulture);
            }
            decimal discount = subtotal >= 500m ? 0.10m : subtotal >= 100m ? 0.05m : 0m;
            decimal total = subtotal * (1m - discount);

            if (totals.ContainsKey(name)) { totals[name] += total; counts[name]++; }
            else { totals[name] = total; counts[name] = 1; }
        }

        return totals
            .OrderBy(kv => kv.Key)
            .Select(kv => kv.Key + ": $" + kv.Value.ToString("F2", CultureInfo.InvariantCulture) + " (" + counts[kv.Key] + " orders)")
            .ToArray();
    }
}`,
        testCases: [
          {
            input: '["Alice|2:60.00", "Bob|1:50.00", "Alice|1:50.00"]',
            expected: '["Alice: $164.00 (2 orders)", "Bob: $50.00 (1 orders)"]',
            description: 'Two customers, Alice has two orders'
          },
          { input: '[]', expected: '[]', description: 'No orders' },
          {
            input: '["Z|1:10", "A|1:10", "M|1:10"]',
            expected: '["A: $10.00 (1 orders)", "M: $10.00 (1 orders)", "Z: $10.00 (1 orders)"]',
            description: 'Alphabetical sort'
          },
          {
            input: '["Solo|10:60.00"]',
            expected: '["Solo: $540.00 (1 orders)"]',
            description: 'Single customer with discount applied'
          },
        ],
        hints: [
          'Two parallel dictionaries: totals (decimal) and counts (int) keyed by name',
          'For each order, accumulate the discounted total AND increment the count',
          'OrderBy(kv => kv.Key) for alphabetical order',
          'Format each row: name + ": $" + total.ToString("F2", invariant) + " (" + count + " orders)"',
        ],
      },
    },
    {
      id: 'l-fin-quiz',
      title: 'You did it',
      type: 'theory',
      xp: 50,
      theory: `# 🎓 Path Complete

If all five capstone challenges turned green, you have walked the full path:

- **Foundations** — syntax, types, control flow, methods, arrays, strings, console I/O
- **OOP** — classes, inheritance, polymorphism, interfaces, access modifiers, enums
- **Generics & Collections** — \`T\`, constraints, Dictionary, HashSet, Queue, Stack, LINQ
- **Modern Language** — null safety, value vs reference, IDisposable, async/await, threading, pattern matching
- **Advanced** — tuples, iterators, reflection, records, variance
- **Ecosystem** — config, logging, DI, ASP.NET Core, EF Core
- **Specialist** — CLR/GC, performance, observability, architecture, distributed systems

## What now

Some directions worth pursuing locally on your machine:

1. **Build a real ASP.NET Core API** end-to-end — auth + EF Core + a deployable Docker image
2. **Try Native AOT** — pick a CLI tool you wrote, publish AOT, observe the startup difference
3. **Write a Roslyn analyzer** — even a simple "warn on TODO comments" rule. Demystifies how the compiler sees your code.
4. **Profile something real** — pick an app, attach \`dotnet-counters\`, find one bottleneck, fix it
5. **Contribute** — \`dotnet/runtime\` and \`dotnet/aspnetcore\` welcome small fixes; the maintainers are responsive

The platform isn't going anywhere — come back for refreshers.`,
    },
  ],
};

const chSourceGen: Chapter = {
  id: 'ch-source-gen',
  title: 'Source Generators',
  description: 'Compile-time codegen — fast, AOT-safe, ubiquitous in modern .NET',
  icon: '⚙️',
  lessons: [
    {
      id: 'l-srcgen-1',
      title: 'What source generators are',
      type: 'theory',
      xp: 20,
      theory: `# Source generators

A **source generator** is a Roslyn component that runs during compilation and emits additional C# files based on the code it sees. The compiler then compiles the generated files alongside your own. Different from runtime reflection: the work happens once at build time, the generated code is plain C#, and there's no runtime cost.

## Why .NET teams care

Modern .NET libraries lean on source generators for two reasons:

1. **AOT-friendliness.** Generated code is statically analyzable, so it survives trimming and works under Native AOT (where \`Reflection.Emit\` doesn't).
2. **Speed.** Replacing reflection with concrete generated methods is often 10-100× faster.

## Common ones in the BCL

- \`System.Text.Json\` source gen — typed serializers per-DTO, no reflection at runtime
- \`LoggerMessage\` — fast logging methods from \`[LoggerMessage]\` attributes
- \`GeneratedRegex\` — hand-rolled regex matcher generated at compile time
- ASP.NET Core route handler source gen for AOT
- \`LibraryImport\` — replaces \`DllImport\` with a generated marshaller

## Authoring is its own world

Writing a source generator means a separate \`netstandard2.0\` project that references \`Microsoft.CodeAnalysis.CSharp\` and implements \`IIncrementalGenerator\`. Powerful but invasive — almost every team consumes generators rather than writes their own.

## How to consume one

Three pieces:
1. Reference the generator-providing NuGet (e.g. \`System.Text.Json\` for the JSON one).
2. Mark your class \`partial\` and apply the generator's attribute.
3. The compiler emits a partial implementation. Use it like normal code.`,
    },
    {
      id: 'l-srcgen-2',
      title: 'Practice: GeneratedRegex',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Use the C# 11+ `[GeneratedRegex]` attribute to create a compile-time regex matching simple email-like strings (`<word>@<word>.<word>`). Print whether `"alex@example.com"` matches.\n\nExpected output:\n```\nTrue\n```',
        starterCode: `using System;
using System.Text.RegularExpressions;

partial class Program
{
    [GeneratedRegex(@"\\w+@\\w+\\.\\w+")]
    private static partial Regex EmailRegex();

    static void Main()
    {
        // Print EmailRegex().IsMatch("alex@example.com")
    }
}
`,
        solution: `using System;
using System.Text.RegularExpressions;

partial class Program
{
    [GeneratedRegex(@"\\w+@\\w+\\.\\w+")]
    private static partial Regex EmailRegex();

    static void Main()
    {
        Console.WriteLine(EmailRegex().IsMatch("alex@example.com"));
    }
}`,
        tests: [{ expectedOutput: 'True', description: 'Compile-time regex matches a basic email' }],
        hints: [
          'The class must be `partial` because the source generator emits the matcher as a partial method',
          'Call `EmailRegex()` to get the compiled Regex, then `.IsMatch(...)`',
          'No `new Regex(...)` — the matcher is generated at build time, no runtime compilation',
        ],
      },
    },
    {
      id: 'l-srcgen-3',
      title: 'Source Generators Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does a source generator run?',
          options: ['At runtime, when the type is first used', 'During compilation, before normal codegen', 'Only when the project is published', 'In a background JIT pass'],
          correctIndex: 1,
          explanation: 'Generators are compiler plugins. They observe the syntax/semantic model and emit additional .cs files for the compiler to include in the same build.',
        },
        {
          question: 'Why does `[GeneratedRegex]` require a `partial` method?',
          options: [
            'Performance',
            'So the generator can supply the implementation in a generated partial file while you declare the signature',
            'It does not — `partial` is optional',
            'Backward compatibility with .NET Framework',
          ],
          correctIndex: 1,
          explanation: 'Source-generated members are emitted into a partial class. You declare the signature; the generator fills in the body in a parallel partial.',
        },
        {
          question: 'Why are source generators a big deal for Native AOT?',
          options: [
            'They reduce binary size',
            'They replace runtime reflection with statically-analyzable code that survives trimming',
            'They turn off the JIT',
            'They run faster than the JIT',
          ],
          correctIndex: 1,
          explanation: 'AOT trims away anything not statically referenced. Reflection-based code can break; generated code is direct calls and survives.',
        },
        {
          question: 'Which is NOT a built-in .NET source generator?',
          options: [
            '`GeneratedRegex`',
            '`LoggerMessage`',
            '`LibraryImport` (P/Invoke replacement)',
            '`AutoMapperGenerator`',
          ],
          correctIndex: 3,
          explanation: 'AutoMapper is a third-party reflection-based mapper (no source gen by default). The other three ship with the BCL.',
        },
      ],
    },
  ],
};

const chAot: Chapter = {
  id: 'ch-aot',
  title: 'Native AOT',
  description: 'Ahead-of-time compilation for fast startup and small images',
  icon: '🏎️',
  lessons: [
    {
      id: 'l-aot-1',
      title: 'AOT vs JIT',
      type: 'theory',
      xp: 25,
      theory: `# Native AOT

By default .NET ships **IL** (intermediate language) bytecode in your assembly and the **JIT** (Just-In-Time) compiler turns it into native code as the program runs. **Native AOT** compiles all of that to machine code at publish time. The output is a self-contained native executable, no runtime needed.

## Why use AOT

- **Startup time**: ~10× faster cold start. A web API can be serving requests in under 100ms.
- **Memory footprint**: smaller working set; the JIT and metadata are gone.
- **Image size**: trimmed binary, often 10-30MB for a web app vs 100MB+ for self-contained framework deploys.
- **Container density**: cheaper to run hundreds of small services.

## Why NOT use AOT

It's restrictive. The compiler has to know every type at build time:

- **No \`Reflection.Emit\`** — you can't generate IL at runtime.
- **Limited reflection** — types not statically referenced get trimmed away. Reflecting over them at runtime returns null or throws.
- **No dynamic loading of arbitrary assemblies** at runtime (with full reflection).
- **Generic instantiations must be discoverable** — opening a generic at runtime over a closed type the compiler didn't see can fail.
- **Some libraries don't work** — anything that pokes at the runtime via reflection probably has trim warnings. The BCL has been heavily refactored to be AOT-friendly; many third-party libs aren't there yet.

## How to publish AOT

In your \`.csproj\`:

\`\`\`xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
\`\`\`

Then \`dotnet publish -c Release\`. The compiler emits warnings (\`IL2026\`, \`IL3050\`, etc.) for code that may not survive trimming — fix those before shipping.

## When it makes sense

- **CLIs** — startup matters, and CLIs rarely need runtime reflection
- **Serverless / FaaS** — pay-per-request loves fast cold start
- **Containers at scale** — image size + startup × 1000s of replicas adds up
- **Games / embedded** — predictability over flexibility

## When it doesn't

- Plugin systems that load arbitrary assemblies at runtime
- ORMs that do heavy reflection (most use \`Reflection.Emit\` for fast property accessors)
- Codebases with lots of \`dynamic\` or DI graphs that aren't statically known`,
    },
    {
      id: 'l-aot-2',
      title: 'AOT Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does Native AOT compile?',
          options: [
            'Just the hot paths discovered during execution',
            'All of your IL to native machine code at publish time',
            'Only managed code; native libs must be linked separately',
            'Only the entry assembly',
          ],
          correctIndex: 1,
          explanation: 'AOT means "ahead of time" — the compiler turns IL into native instructions before the program ever runs.',
        },
        {
          question: 'Which is NOT a typical benefit of AOT?',
          options: ['Faster startup', 'Smaller binaries', 'Higher peak throughput than JIT', 'Less memory at runtime'],
          correctIndex: 2,
          explanation: 'AOT often loses to JIT on peak throughput because the JIT has runtime profile data and can re-optimize hot paths.',
        },
        {
          question: 'Why does `Reflection.Emit` fail under AOT?',
          options: [
            'No JIT means no facility to compile new IL at runtime',
            'It is just slower under AOT',
            'It works fine — AOT and Emit are unrelated',
            'It requires the GC',
          ],
          correctIndex: 0,
          explanation: 'Emit produces IL and asks the runtime to JIT it. AOT removes the JIT entirely, so there is nothing to compile that IL.',
        },
        {
          question: 'You enable AOT and see warning IL2026 on a method using reflection. What should you do?',
          options: [
            'Suppress it — IL warnings are advisory',
            'Investigate: the trimmer might remove referenced members. Refactor or apply DynamicallyAccessedMembers',
            'Switch to .NET Framework',
            'Disable trimming',
          ],
          correctIndex: 1,
          explanation: 'IL2026 says "this code uses reflection in a way the trimmer can\'t analyze." Either rewrite without reflection, use a source generator, or annotate with `DynamicallyAccessedMembers` to keep what reflection needs.',
        },
        {
          question: 'Which scenario is the best fit for AOT?',
          options: [
            'A plugin host that loads arbitrary user assemblies at runtime',
            'A CLI tool where startup time visibly matters',
            'An ORM heavy in runtime IL emit',
            'An app with deep reliance on `dynamic`',
          ],
          correctIndex: 1,
          explanation: 'CLIs run, do their work, exit — startup is the whole show. The other scenarios all need runtime flexibility AOT removes.',
        },
      ],
    },
  ],
};

const chChannels: Chapter = {
  id: 'ch-channels',
  title: 'Channels & Producer/Consumer',
  description: 'System.Threading.Channels for asynchronous pipelines',
  icon: '📨',
  lessons: [
    {
      id: 'l-chan-1',
      title: 'Channels',
      type: 'theory',
      xp: 20,
      theory: `# Channels

\`System.Threading.Channels\` ships in the BCL and gives you a typed, async-friendly producer/consumer queue. Think \`BlockingCollection<T>\` for the async-await world.

## Shape

A \`Channel<T>\` has two ends:

- \`channel.Writer\` — \`WriteAsync\`, \`TryWrite\`, \`Complete\`
- \`channel.Reader\` — \`ReadAsync\`, \`TryRead\`, \`ReadAllAsync\` (IAsyncEnumerable), \`Completion\` (Task)

Multiple producers and multiple consumers are allowed (configurable for single-reader / single-writer fast paths).

## Bounded vs unbounded

\`\`\`csharp
// Unbounded: writer never blocks; can run unbounded if consumer falls behind
var ch = Channel.CreateUnbounded<int>();

// Bounded: writer awaits when capacity is full → backpressure
var ch = Channel.CreateBounded<int>(capacity: 100);
\`\`\`

Use **bounded** in production. Unbounded queues are silent failure modes — by the time the queue is huge, you have a problem.

## When the producer is done

\`\`\`csharp
ch.Writer.Complete();           // signals "no more items"
\`\`\`

Consumers iterating \`ReadAllAsync\` will exit cleanly. \`Complete(exception)\` propagates an exception into all waiting readers.

## Pattern

\`\`\`csharp
// producer
async Task ProduceAsync(ChannelWriter<int> writer)
{
    for (int i = 0; i < 100; i++)
        await writer.WriteAsync(i);
    writer.Complete();
}

// consumer
async Task ConsumeAsync(ChannelReader<int> reader)
{
    await foreach (var item in reader.ReadAllAsync())
        Console.WriteLine(item);
}
\`\`\`

## When to use it

- Pipelines: stage A produces, stage B transforms, stage C writes. Each stage is its own task; channels glue them.
- Decoupling fast incoming work from slow processing (with bounded backpressure)
- Replacing your own \`BlockingCollection\` + \`Task.Run\` ad-hoc setups

## When to reach for something else

- One-shot event flow → just \`await\` directly
- Pub/sub broadcast to many subscribers → \`Channel\` is point-to-point; consider \`Rx\` or \`IAsyncEnumerable\` with multiple subscribers
- Distributed (cross-process / cross-machine) → use a message broker (Azure Service Bus, RabbitMQ, Kafka)`,
    },
    {
      id: 'l-chan-2',
      title: 'Practice: Producer/Consumer',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Use a bounded `Channel<int>` (capacity 4) to feed numbers 1..5 from a producer task to a consumer task. The consumer prints each number it reads. Producer calls `Complete()` when done.\n\nExpected output (order matters — single producer, single consumer):\n```\n1\n2\n3\n4\n5\n```',
        starterCode: `using System;
using System.Threading.Channels;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var channel = Channel.CreateBounded<int>(4);

        var producer = Task.Run(async () =>
        {
            // Write 1..5 to channel.Writer, then Complete()
        });

        var consumer = Task.Run(async () =>
        {
            // ReadAllAsync and print each item
        });

        await Task.WhenAll(producer, consumer);
    }
}
`,
        solution: `using System;
using System.Threading.Channels;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var channel = Channel.CreateBounded<int>(4);

        var producer = Task.Run(async () =>
        {
            for (int i = 1; i <= 5; i++)
                await channel.Writer.WriteAsync(i);
            channel.Writer.Complete();
        });

        var consumer = Task.Run(async () =>
        {
            await foreach (var item in channel.Reader.ReadAllAsync())
                Console.WriteLine(item);
        });

        await Task.WhenAll(producer, consumer);
    }
}`,
        tests: [{ expectedOutput: '1\n2\n3\n4\n5', description: 'Single-producer, single-consumer pipeline' }],
        hints: [
          'Producer: `await channel.Writer.WriteAsync(i);` then `channel.Writer.Complete();`',
          'Consumer: `await foreach (var item in channel.Reader.ReadAllAsync())`',
          'WhenAll on both tasks so Main waits for the consumer to finish printing',
        ],
      },
    },
    {
      id: 'l-chan-3',
      title: 'Channels Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why prefer a bounded channel in production?',
          options: [
            'They are faster',
            'Backpressure: the writer awaits when capacity is reached, preventing runaway memory growth',
            'They guarantee FIFO ordering (unbounded does not)',
            'Bounded channels are required for AOT',
          ],
          correctIndex: 1,
          explanation: 'Both forms are FIFO. Bounded gives you a circuit breaker — a slow consumer slows the producer instead of letting the queue grow forever.',
        },
        {
          question: 'How does a consumer cleanly exit a Channel loop?',
          options: [
            'Read the special token `null`',
            'The producer calls `Writer.Complete()` and `ReadAllAsync` ends',
            'It must be cancelled with a CancellationToken',
            'Channels do not support clean exit',
          ],
          correctIndex: 1,
          explanation: '`Complete()` signals end-of-stream. `ReadAllAsync` enumerates remaining items then completes. `Complete(exception)` instead propagates an error.',
        },
        {
          question: 'Which is NOT a good Channel use case?',
          options: [
            'Multi-stage processing pipeline within a single process',
            'Decoupling burst-y incoming load from slower downstream work',
            'Broadcasting an event to many independent subscribers',
            'Bridging an event-driven API to async code',
          ],
          correctIndex: 2,
          explanation: 'Channels are point-to-point — each item is consumed by exactly one reader. For broadcast you want Rx or `IAsyncEnumerable` with subscriber multiplexing.',
        },
      ],
    },
  ],
};

const chAnalyzers: Chapter = {
  id: 'ch-analyzers',
  title: 'Roslyn Analyzers',
  description: 'Custom compile-time rules and code fixes',
  icon: '🔍',
  lessons: [
    {
      id: 'l-ana-1',
      title: 'What analyzers do',
      type: 'theory',
      xp: 20,
      theory: `# Roslyn analyzers

A **Roslyn analyzer** is a compiler plugin that walks the syntax tree (and semantic model) of every compiled project and reports diagnostics — warnings, errors, infos. The compiler treats them like its own diagnostics: they appear in the IDE, in build output, on CI.

A **code fix** is the optional companion: given a flagged diagnostic, propose a transformation the IDE can apply with one keystroke.

## Anatomy

\`\`\`csharp
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class NoTodoAnalyzer : DiagnosticAnalyzer
{
    static readonly DiagnosticDescriptor Rule = new(
        "MYAPP001",
        "TODO comment",
        "TODO comments should be tracked in an issue, not the code",
        "Hygiene",
        DiagnosticSeverity.Warning,
        isEnabledByDefault: true);

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
        => ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext ctx)
    {
        ctx.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        ctx.EnableConcurrentExecution();
        ctx.RegisterSyntaxTreeAction(treeCtx =>
        {
            foreach (var c in treeCtx.Tree.GetRoot().DescendantTrivia()
                .Where(t => t.IsKind(SyntaxKind.SingleLineCommentTrivia)))
            {
                if (c.ToString().Contains("TODO"))
                    treeCtx.ReportDiagnostic(
                        Diagnostic.Create(Rule, c.GetLocation()));
            }
        });
    }
}
\`\`\`

## How they ship

An analyzer lives in a \`netstandard2.0\` project that references \`Microsoft.CodeAnalysis.CSharp\`. Package it as NuGet with the \`<Analyzer>\` packaging metadata; consumers reference the package and the analyzer runs in their build.

## Configuration via .editorconfig

Severity is end-user-controllable per-rule:

\`\`\`ini
[*.cs]
dotnet_diagnostic.MYAPP001.severity = error
\`\`\`

So a CI build can promote a warning to an error without touching the analyzer.

## What they're great at

- Style enforcement (forbid \`Console.WriteLine\` in production code, require \`ConfigureAwait(false)\` in libraries)
- Catching anti-patterns specific to your codebase
- Migration aids (warn on usage of an old API and offer an auto-fix to the new one)
- Domain-specific lints (e.g. ASP.NET Core has dozens of built-in analyzers for routing, MVC, signalR)

## What they're not

- Full type-checkers — Roslyn does that already
- Runtime contracts — analyzers run at compile time only
- Cross-project flow analysis — limited; designed for per-method or per-file checks

## Built-in analyzers worth turning on

- **NetAnalyzers** (CA0xxx) — included by default in modern SDK; performance and correctness lints
- **AsyncFixer** / **VSThreading** for async best-practices
- **StyleCop.Analyzers** for style consistency
- **ThreadSafety** rules from various packages`,
    },
    {
      id: 'l-ana-2',
      title: 'Analyzers Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'When does a Roslyn analyzer run?',
          options: ['At app startup', 'During every compilation, on every keystroke in the IDE', 'Only on CI', 'Only when explicitly invoked'],
          correctIndex: 1,
          explanation: 'Analyzers integrate with the compiler. The IDE re-runs them as you type so squiggles appear live.',
        },
        {
          question: 'What does a code fix add to an analyzer?',
          options: [
            'Auto-formats the file',
            'A proposed code transformation the user can apply to address the diagnostic',
            'A test runner',
            'Performance counters',
          ],
          correctIndex: 1,
          explanation: 'Code fixes turn "warning: TODO comment" into "...and pressing Alt+Enter rewrites it for you."',
        },
        {
          question: 'How does a downstream consumer adjust a rule\'s severity?',
          options: [
            'Modify the analyzer source',
            'Use `.editorconfig` with `dotnet_diagnostic.RULEID.severity = ...`',
            'Pass a flag to dotnet build',
            'Severity is fixed by the analyzer author',
          ],
          correctIndex: 1,
          explanation: '.editorconfig is the standard escape hatch — promote, demote, or silence rules per-folder.',
        },
        {
          question: 'Which is NOT a typical analyzer use case?',
          options: [
            'Forbid `Console.WriteLine` in production code',
            'Require `ConfigureAwait(false)` in library code',
            'Inject a runtime cache around methods',
            'Suggest replacing `string.Format` with interpolation',
          ],
          correctIndex: 2,
          explanation: 'Analyzers report diagnostics at compile time. Runtime behavior changes belong to source generators or actual code.',
        },
      ],
    },
  ],
};

const chIlEmit: Chapter = {
  id: 'ch-il-emit',
  title: 'IL & Reflection.Emit',
  description: 'Generating types and methods at runtime',
  icon: '🛠️',
  lessons: [
    {
      id: 'l-ile-1',
      title: 'IL basics',
      type: 'theory',
      xp: 25,
      theory: `# IL & Reflection.Emit

Every C# assembly contains **IL** — a stack-based instruction set the runtime executes via JIT. Most of the time IL is invisible. \`Reflection.Emit\` lets you create and execute IL **at runtime** without going through the C# compiler.

## A taste of IL

\`\`\`
ldarg.0      // load arg 0 onto stack
ldarg.1      // load arg 1
add          // pop 2, push sum
ret          // return top of stack
\`\`\`

That's the entire body of \`int Add(int a, int b) => a + b;\` after compilation. Stack-based, very small, very direct.

## When you'd write IL at runtime

- **Dynamic proxies** — interception, AOP, mocking frameworks (Castle.DynamicProxy, Moq)
- **ORMs** — Entity Framework historically used Emit to build fast property accessors
- **Serializers** — pre-AOT-era JSON libs emitted member readers/writers
- **Expression trees** — \`System.Linq.Expressions\` compiles to IL under the hood
- **DSLs** — interpreters that generate code from script source

## What replaced it

For most of those uses, **source generators** are now preferred:

- Statically analyzable → AOT-friendly
- Debuggable (the generated code is real C# you can step through)
- No "trust me, this is what it does" surprise

\`Reflection.Emit\` is still useful when:
- The shape isn't known until runtime (genuinely dynamic, e.g. plugin types built from user input)
- You're writing an interpreter and need the JIT-speed for hot paths
- Migration of legacy codebases

## DynamicMethod — the lightweight tool

\`DynamicMethod\` creates a single method without a containing type, executes it, then GCs cleanly. Good for hot-path dispatchers:

\`\`\`csharp
var add = new DynamicMethod("Add", typeof(int), new[] { typeof(int), typeof(int) });
var il = add.GetILGenerator();
il.Emit(OpCodes.Ldarg_0);
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Add);
il.Emit(OpCodes.Ret);
var fn = (Func<int, int, int>)add.CreateDelegate(typeof(Func<int, int, int>));
fn(2, 3); // 5
\`\`\`

## AssemblyBuilder / TypeBuilder — full power

For "create a real type at runtime" scenarios you go up to \`AssemblyBuilder\` → \`ModuleBuilder\` → \`TypeBuilder\` → \`MethodBuilder\` and emit instructions. More ceremony, more capable.

## Caveats

- Not AOT-safe — there's no JIT to compile your emitted IL.
- Bug surface area is high — emitting wrong IL can crash the process with no useful error.
- Performance benefit only matters if the dispatcher is on a real hot path.`,
    },
    {
      id: 'l-ile-2',
      title: 'Practice: DynamicMethod Add',
      type: 'code',
      xp: 35,
      codeExercise: {
        instructions: 'Use `DynamicMethod` and `Reflection.Emit` to build a method that adds two ints. Cast it to `Func<int,int,int>` and call it with `(2, 3)`. Print the result.\n\nExpected output:\n```\n5\n```',
        starterCode: `using System;
using System.Reflection.Emit;

class Program
{
    static void Main()
    {
        var dm = new DynamicMethod("Add", typeof(int), new[] { typeof(int), typeof(int) });
        var il = dm.GetILGenerator();
        // Emit: ldarg.0, ldarg.1, add, ret

        var fn = (Func<int, int, int>)dm.CreateDelegate(typeof(Func<int, int, int>));
        Console.WriteLine(fn(2, 3));
    }
}
`,
        solution: `using System;
using System.Reflection.Emit;

class Program
{
    static void Main()
    {
        var dm = new DynamicMethod("Add", typeof(int), new[] { typeof(int), typeof(int) });
        var il = dm.GetILGenerator();
        il.Emit(OpCodes.Ldarg_0);
        il.Emit(OpCodes.Ldarg_1);
        il.Emit(OpCodes.Add);
        il.Emit(OpCodes.Ret);

        var fn = (Func<int, int, int>)dm.CreateDelegate(typeof(Func<int, int, int>));
        Console.WriteLine(fn(2, 3));
    }
}`,
        tests: [{ expectedOutput: '5', description: 'Emitted method adds 2 + 3' }],
        hints: [
          'Four instructions: load arg 0, load arg 1, add, return',
          '`il.Emit(OpCodes.Ldarg_0);` etc.',
          'After Emit, `dm.CreateDelegate(...)` returns the runnable delegate',
        ],
      },
    },
    {
      id: 'l-ile-3',
      title: 'IL Emit Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What is IL?',
          options: [
            'The native instruction set of the CPU',
            'A stack-based intermediate language the .NET runtime executes via JIT',
            'A library for parsing C#',
            'A markup format for resources',
          ],
          correctIndex: 1,
          explanation: 'IL = Intermediate Language. The C# compiler emits it. The runtime\'s JIT (or AOT compiler) turns it into machine code.',
        },
        {
          question: 'Why doesn\'t `Reflection.Emit` work under Native AOT?',
          options: [
            'AOT does not support arrays',
            'There is no JIT to compile freshly-emitted IL',
            'AOT removes the BCL',
            'It works fine under AOT',
          ],
          correctIndex: 1,
          explanation: 'AOT pre-compiles all IL to native at publish time. Emit produces new IL at runtime — there is no compiler to consume it.',
        },
        {
          question: 'Which is the modern, AOT-friendly replacement for most Reflection.Emit use cases?',
          options: ['Dynamic dispatch', 'Source generators', 'Reflection-only loading', 'Expression compilation'],
          correctIndex: 1,
          explanation: 'Source generators do the codegen at build time — AOT-safe, debuggable, fast.',
        },
        {
          question: 'What does `OpCodes.Ldarg_0` do?',
          options: [
            'Loads the local variable at index 0',
            'Pushes the first argument onto the evaluation stack',
            'Loads zero',
            'Defines argument 0',
          ],
          correctIndex: 1,
          explanation: 'Ldarg_0 = "load argument 0". For static methods that\'s the first parameter; for instance methods it\'s `this`.',
        },
      ],
    },
  ],
};

const chCrypto: Chapter = {
  id: 'ch-crypto',
  title: 'Cryptography',
  description: 'Hashing, encryption, signing — the practical surface',
  icon: '🔐',
  lessons: [
    {
      id: 'l-cry-1',
      title: 'Crypto primitives',
      type: 'theory',
      xp: 25,
      theory: `# Cryptography in .NET

Crypto in .NET lives under \`System.Security.Cryptography\`. The four primitives you'll meet most often:

## 1. Hashing (one-way)

Maps any input to a fixed-size digest. Same input → same output, but you cannot reverse it.

\`\`\`csharp
using var sha = SHA256.Create();
byte[] digest = sha.ComputeHash(Encoding.UTF8.GetBytes("hello"));
string hex = Convert.ToHexString(digest);
\`\`\`

Use cases: file integrity (\`SHA256\`), content-addressable storage. **Not for passwords** — see below.

## 2. HMAC — keyed hashing

Adds a secret key. Same shape as hashing, but two parties with the same key can verify a message wasn't tampered with.

\`\`\`csharp
using var hmac = new HMACSHA256(key);
byte[] mac = hmac.ComputeHash(payload);
\`\`\`

Use cases: API request signing (the AWS SDK does this), webhook verification.

## 3. Symmetric encryption

Same key encrypts and decrypts. Modern choice: **AES-GCM** (authenticated encryption — you also get integrity for free).

\`\`\`csharp
using var aes = new AesGcm(key, tagSize: 16);
aes.Encrypt(nonce, plaintext, ciphertext, tag);
aes.Decrypt(nonce, ciphertext, tag, plaintext); // throws on tamper
\`\`\`

The **nonce must be unique per encryption with the same key**. Reusing it leaks plaintext bits.

## 4. Asymmetric encryption / signing

Public key encrypts, private key decrypts (or vice versa for signing). Slow → mostly used to bootstrap a symmetric session key. RSA is the workhorse; ECDsa is the modern choice for signing.

\`\`\`csharp
using var rsa = RSA.Create();
byte[] sig = rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
\`\`\`

## Passwords are special

\`SHA256(password)\` is **wrong**. Use a deliberately-slow KDF designed for passwords:

- \`Rfc2898DeriveBytes\` (PBKDF2) — built-in, decent
- \`bcrypt\`, \`scrypt\`, \`Argon2\` (third-party) — preferred where allowed

Always: random salt, high iteration count, store \`{algorithm, iterations, salt, hash}\`.

## ASP.NET Core: Data Protection

For "encrypt this auth cookie / connection string at rest" use cases, the \`Microsoft.AspNetCore.DataProtection\` API hides all of the above behind \`Protect/Unprotect\` and handles key rotation automatically:

\`\`\`csharp
var protector = provider.CreateProtector("Auth.Cookie");
string protectedText = protector.Protect("some payload");
\`\`\`

Use this 90% of the time. Only reach for raw primitives when you need exact control over format / interop with another system.

## Don't roll your own

There's a long, embarrassing history of crypto bugs in homegrown schemes (no IV, IV reuse, no MAC, padding oracles, timing attacks…). Use the BCL primitives. Use \`Microsoft.AspNetCore.DataProtection\` when you can. Read [Cryptographic Right Answers](https://gist.github.com/tqbf/be58d2d39690c3b366ad) before designing anything new.`,
    },
    {
      id: 'l-cry-2',
      title: 'Practice: SHA256 hash',
      type: 'code',
      xp: 30,
      codeExercise: {
        instructions: 'Hash the string `"hello"` with SHA256 and print the result as **lowercase hex** (no separators, 64 characters).\n\nExpected output:\n```\n2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\n```',
        starterCode: `using System;
using System.Security.Cryptography;
using System.Text;

class Program
{
    static void Main()
    {
        // Hash "hello" with SHA256, print lowercase hex
    }
}
`,
        solution: `using System;
using System.Security.Cryptography;
using System.Text;

class Program
{
    static void Main()
    {
        byte[] digest = SHA256.HashData(Encoding.UTF8.GetBytes("hello"));
        Console.WriteLine(Convert.ToHexString(digest).ToLowerInvariant());
    }
}`,
        tests: [{ expectedOutput: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', description: 'Standard SHA256 of "hello"' }],
        hints: [
          '`SHA256.HashData(bytes)` is the modern one-call API (since .NET 5)',
          '`Encoding.UTF8.GetBytes(s)` converts the string to bytes',
          '`Convert.ToHexString(bytes)` produces uppercase; lowercase via `.ToLowerInvariant()`',
        ],
      },
    },
    {
      id: 'l-cry-3',
      title: 'Crypto Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'Why is `SHA256(password)` wrong for password storage?',
          options: [
            'SHA256 is broken',
            'It is too fast — attackers brute-force billions of guesses per second per GPU',
            'It produces too short a digest',
            'It is not available in .NET',
          ],
          correctIndex: 1,
          explanation: 'Password KDFs (PBKDF2, bcrypt, scrypt, Argon2) are deliberately slow with tunable cost so brute-forcing is expensive.',
        },
        {
          question: 'In AES-GCM, what happens if you reuse a nonce with the same key?',
          options: [
            'Nothing — the nonce is just an arbitrary parameter',
            'Catastrophic — attackers can recover plaintext bits',
            'You get a slower encrypt',
            'The MAC fails',
          ],
          correctIndex: 1,
          explanation: 'GCM\'s security relies on never reusing nonce with the same key. Use a counter, random 96-bit value, or generate a fresh key per message.',
        },
        {
          question: 'When should you reach for `Microsoft.AspNetCore.DataProtection` instead of raw primitives?',
          options: [
            'Never — always use raw primitives',
            'For server-local "encrypt this string at rest" use cases (cookies, tokens) where you don\'t need cross-system interop',
            'Only for symmetric encryption',
            'Only when AOT publishing',
          ],
          correctIndex: 1,
          explanation: 'DataProtection handles key rotation, algorithm choice, format. You lose only when you need to interop with a system expecting a specific format.',
        },
        {
          question: 'What does HMAC give you that plain hashing does not?',
          options: [
            'Speed',
            'Authenticity: only someone with the secret key can produce a valid MAC',
            'Reversibility',
            'Compression',
          ],
          correctIndex: 1,
          explanation: 'A keyed hash is unforgeable without the key. HMAC is the standard construction; popular for API request signing.',
        },
        {
          question: 'Asymmetric crypto (RSA, ECDsa) is mostly used for...',
          options: [
            'Encrypting large blobs of data directly',
            'Bootstrapping symmetric keys and signing',
            'Hashing passwords',
            'Compression',
          ],
          correctIndex: 1,
          explanation: 'It\'s slow and has size limits. The pattern is: use asymmetric to exchange or sign a symmetric key, then symmetric for the bulk data.',
        },
      ],
    },
  ],
};

const chPlugin: Chapter = {
  id: 'ch-plugin',
  title: 'Plugin Architecture & AssemblyLoadContext',
  description: 'Loading and isolating assemblies at runtime',
  icon: '🧩',
  lessons: [
    {
      id: 'l-plug-1',
      title: 'AssemblyLoadContext',
      type: 'theory',
      xp: 25,
      theory: `# Plugin architectures

Sometimes you want to load .NET code that wasn't on disk when your app started: plugin systems, hot-reload, scripting hosts. The primary tool is **\`AssemblyLoadContext\` (ALC)**.

## What an ALC is

A boundary inside the runtime that owns a set of loaded assemblies. The default ALC holds your app and its NuGet references. Custom ALCs let you:

- **Load** an assembly that isn't statically referenced (\`alc.LoadFromAssemblyPath(...)\`)
- **Isolate** assemblies — two ALCs can each hold a different version of the same library without conflict
- **Unload** the assemblies (if the ALC is **collectible**) — useful for reloadable plugins

\`\`\`csharp
var alc = new AssemblyLoadContext("plugin-A", isCollectible: true);
var asm = alc.LoadFromAssemblyPath(pluginPath);
var pluginType = asm.GetType("Plugin.MyPlugin")!;
var instance = Activator.CreateInstance(pluginType);
// ... use it ...
alc.Unload(); // GC eventually frees everything if no references escape
\`\`\`

## The "shared contract" problem

Your host has a \`IPlugin\` interface. The plugin DLL implements \`IPlugin\`. If both load the interface from a file, those become **two different types** as far as the runtime is concerned, and your cast fails.

The fix: the host loads \`IPlugin\` once (in the default ALC), and the plugin ALC has \`Resolving\` redirect that interface assembly to the default ALC's already-loaded version. Plugins reference the interface from their own \`compileonly\` package; at runtime the type unifies.

\`\`\`csharp
alc.Resolving += (ctx, name) =>
{
    if (name.Name == "MyApp.PluginContract")
        return AssemblyLoadContext.Default.LoadFromAssemblyName(name);
    return null;
};
\`\`\`

## Collectible ALC pitfalls

- Any reference from the default ALC to a plugin object pins the whole ALC. \`Unload()\` only completes once all references are gone and a GC has run.
- Static fields on plugin types live as long as the ALC.
- AOT publishing doesn't support runtime assembly loading the way JIT does.

## MEF — older and heavier

\`System.Composition\` (modern MEF) layers attribute-driven part discovery on top:

\`\`\`csharp
[Export(typeof(IPlugin))]
public class MyPlugin : IPlugin { /* ... */ }
\`\`\`

A \`CompositionHost\` scans assemblies and wires up exports/imports automatically. Useful for big plugin ecosystems (VS itself uses it). For a small app: just load + reflect, skip MEF.

## Modern alternatives

- **\`Microsoft.Extensions.DependencyInjection\` + a plugin attribute** — register types via reflection at startup
- **\`PluginLoader\`** (a community library that wraps ALC + dependency resolution properly)
- **WASM sandbox** — for untrusted plugins, run them in WASI / Wasmtime instead of trusting in-process code

## When you actually need this

- IDE / editor extensions
- Game modding hosts
- ETL pipelines where transforms ship as DLLs
- Multi-tenant function runners

For most app-internal use cases, plain DI is enough — you don't need ALC unless you're loading code that wasn't compiled with your app.`,
    },
    {
      id: 'l-plug-2',
      title: 'Plugins Quiz',
      type: 'quiz',
      xp: 15,
      quiz: [
        {
          question: 'What does an `AssemblyLoadContext` provide?',
          options: [
            'A faster JIT',
            'A boundary that owns a set of loaded assemblies and can be isolated/unloaded',
            'Compile-time codegen',
            'A replacement for the GC',
          ],
          correctIndex: 1,
          explanation: 'ALC is the runtime\'s extension point for "load some assemblies into a sandbox I control."',
        },
        {
          question: 'You have `IPlugin` defined in your host. The plugin DLL also references `IPlugin` and implements it. Why might the cast fail?',
          options: [
            'C# does not support interfaces across assemblies',
            'The plugin\'s ALC loaded its own copy of the interface assembly — two distinct types from the runtime\'s POV',
            'Plugins must be `unsafe`',
            'The interface needs `[Serializable]`',
          ],
          correctIndex: 1,
          explanation: 'Type identity in .NET = (assembly, type). Two ALCs with the same assembly bytes give you two types. Fix: redirect the contract assembly to the default ALC.',
        },
        {
          question: 'Why is a "collectible" ALC sometimes hard to actually unload?',
          options: [
            'It needs admin rights',
            'Any rooted reference from outside the ALC pins it; unload completes only after a GC with no live references',
            'It is unloaded immediately on `Unload()`',
            'Collectible ALCs cannot be unloaded',
          ],
          correctIndex: 1,
          explanation: 'Forgotten event subscriptions, cached delegates, static fields elsewhere — any reference keeps the ALC alive. Auditing roots is the hard part of hot-reload.',
        },
        {
          question: 'When should you NOT use `AssemblyLoadContext`?',
          options: [
            'When publishing with Native AOT (no runtime assembly loading)',
            'For app-internal plugin discovery — DI is simpler',
            'Both of the above',
            'Never — ALC is always the right tool',
          ],
          correctIndex: 2,
          explanation: 'AOT removes runtime loading; DI handles in-app extensibility. Reach for ALC for genuinely-runtime-loaded code (3rd-party plugins, hot-reload, scripting).',
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
    chMilestone1,
    ch7Collections,
    chCollections,
    ch8Strings,
    chStringsAdv,
    ch9OopBasics,
    chAccess,
    chEnums,
    ch10Inheritance,
    chMilestone2,
    chGenerics,
    chDelegates,
    chNRT,
    chValueRef,
    chDisposable,
    ch11Linq,
    chAdvLinq,
    chMilestone3,
    chAsync,
    chTask,
    chThreading,
    chPatterns,
    chTuples,
    chIterators,
    chReflection,
    chRecords,
    chVariance,
    ch12Exceptions,
    chFileIO,
    ch13Milestone,
    chTesting,
    chConfig,
    chLogging,
    chDI,
    chAspNet,
    chClr,
    chPerf,
    chObs,
    chArch,
    chDist,
    chSourceGen,
    chAot,
    chChannels,
    chAnalyzers,
    chIlEmit,
    chCrypto,
    chPlugin,
    chFinalCapstone,
  ],
};

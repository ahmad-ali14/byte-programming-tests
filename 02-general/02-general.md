# Spreadsheet

Another data checking issue, this time we are getting some spreadsheet data in tab-separated value (TSV) format. To make sure everything is correct we once again need to calculate and compare a checksum for this data. This time, for each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

## Examples

Given the following spreadsheet:

```
5	1	9	5
7	5	3
2	4	6	8
```
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

## Input Data

The client sent the input data in the file `01-general.tsv` and the checksum value `32121`.

## Constraints

You may use any language and/or framework for this exercise, you are encouraged to write one or more unit tests to confirm your results.

#!/usr/bin/env python
import sys

transdict = {"4F": '=', "57": '#', "51": '*',
             "52": 0x0, "53": 0x0, "54": '~',
             "55": '+', "58": '$', "7F": ' ',
             "80": 'A', "81": 'B', "82": 'C',
             "83": 'D', "84": 'E', "85": 'F',
             "86": 'G', "87": 'H', "88": 'I',
             "89": 'J', "8A": 'K', "8B": 'L',
             "8C": 'M', "8D": 'N', "8E": 'O',
             "8F": 'P', "90": 'Q', "91": 'R',
             "92": 'S', "93": 'T', "50": 0x000,
             "94": 'U', "95": 'V', "96": 'W',  # Translation dictionary from hex to alphabet
             "97": 'X', "98": 'Y', "99": 'Z',
             "9C": ':', "A0": 'a', "A1": 'b',
             "A2": 'c', "A3": 'd', "A4": 'e',
             "A5": 'f', "A6": 'g', "A7": 'h',
             "A8": 'i', "A9": 'j', "AA": 'k',
             "AB": 'l', "AC": 'm', "AD": 'n',
             "AE": 'o', "AF": 'p', "B0": 'q',
             "B1": 'r', "B2": 's', "B3": 't',
             "B4": 'u', "B5": 'v', "B6": 'w',
             "B7": 'x', "B8": 'y', "B9": 'z',
             "BA": 0x2, "BC": ' ', "BD": ' ',
             "BE": ' ', "BF": ' ', "E0": "'\'",
             "E1": '~', "E2": '@', "E3": '-',
             "E4": ' ', "E5": ' ', "E6": '?',
             "E7": '!', "E8": '.', "F4": ',',
             "F6": '0', "F7": '1', "F8": '2',
             "F9": '3', "FA": '4', "FB": '5',
             "FC": '6', "FD": '7', "FE": '8',
             "FF": '9'}

inv_transdict = {v: k for k, v in transdict.items()}


def loopit():
    while True:
        try:
            name = input('Enter text (CTRL + c to exit)\n: ')
            encoded_name = ''

            for i in name:
                encoded_name = encoded_name + inv_transdict.get(i, '') + " "

            print(encoded_name)
        except KeyboardInterrupt:
            print('\nClosing.')
            sys.exit()


if len(sys.argv) <= 1:
    name = input('Enter pokemon name\n: ')
elif sys.argv[1] == 'c':
    loopit()
elif len(sys.argv) == 2:
    name = sys.argv[1]

encoded_name = ''

for i in name:
    encoded_name = encoded_name + inv_transdict.get(i, '') + " "

print(encoded_name)

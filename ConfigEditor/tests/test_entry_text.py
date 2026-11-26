import unittest

from config_editor.entry_text import normalise_entry
from config_editor.tex import TexError


class EntryTextTest(unittest.TestCase):
    def test_escape_ordinary_text_without_touching_latex(self):
        for source, expected in (
            ("PEPE_JUAN", r"PEPE\_JUAN"),
            (r"PEPE\_JUAN", r"PEPE\_JUAN"),
            ("$3_4$", "$3_4$"),
            (r"\textbf{PEPE_JUAN}", r"\textbf{PEPE\_JUAN}"),
            ("I+D & control al 50%", r"I+D \& control al 50\%"),
            ("Costs $10 and $20", r"Costs \$10 and \$20"),
            (r"$$a_b^c$$, \(3_4\), \[a_4\]", r"$$a_b^c$$, \(3_4\), \[a_4\]"),
            (r"$x_1+\text{PEPE_JUAN}$", r"$x_1+\text{PEPE\_JUAN}$"),
            (r"\[ \begin{aligned}a_1&=b \\ b_1&=c\end{aligned} \]",
             r"\[ \begin{aligned}a_1&=b \\ b_1&=c\end{aligned} \]"),
            (r"\verb|x_y#z| and #3", r"\verb|x_y#z| and \#3"),
            ("A~B^C", r"A~B\textasciicircum{}C"),
        ):
            with self.subTest(source=source):
                self.assertEqual(expected, normalise_entry(source))
                self.assertEqual(expected, normalise_entry(expected))

    def test_comment_and_uri_context(self):
        self.assertEqual("First % note\r\n100\\%\r\n% remark\r\nLast",
                         normalise_entry("First % note\r\n100%\r\n% remark\r\nLast",
                                         original="Previous % note\r\n"))
        self.assertEqual(r"https://example.org/a_b?q=50\%25\#tag&x=2",
                         normalise_entry("https://example.org/a_b?q=50%25#tag&x=2", kind="uri"))
        self.assertEqual(r"\href{https://example.org/a_b\#bio}{A\&B}",
                         normalise_entry(r"\href{https://example.org/a_b#bio}{A&B}"))
        self.assertEqual(r"pepe\_juan+test@example.org", normalise_entry("pepe_juan+test@example.org", kind="email"))

    def test_incomplete_explicit_latex_rejected(self):
        for value in (r"\(a_b", r"$$a_b", r"\textbf{unfinished", r"extra}", r"\begin{matrix}1&2"):
            with self.subTest(value=value), self.assertRaises(TexError):
                normalise_entry(value)

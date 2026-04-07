import sqlite3
import os
from datetime import datetime

DB_PATH = 'students.db'

def test_verification():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('DELETE FROM students')
    conn.execute('INSERT INTO students (roll_number) VALUES (?)', ('TEST001',))
    conn.commit()
    
    # Test 1: Authorized
    cursor = conn.cursor()
    student = conn.execute('SELECT * FROM students WHERE roll_number = ?', ('TEST001',)).fetchone()
    if student and not student[1]:
        print("Test 1 Passed: Student found and not scanned.")
        conn.execute('UPDATE students SET is_scanned = 1, scanned_at = ? WHERE roll_number = ?',
                     (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'TEST001'))
        conn.commit()
    else:
        print("Test 1 Failed.")

    # Test 2: Duplicate
    student = conn.execute('SELECT * FROM students WHERE roll_number = ?', ('TEST001',)).fetchone()
    if student and student[1]:
        print("Test 2 Passed: Student found and already scanned.")
    else:
        print("Test 2 Failed.")

    # Test 3: Not Authorized
    student = conn.execute('SELECT * FROM students WHERE roll_number = ?', ('UNKNOWN',)).fetchone()
    if not student:
        print("Test 3 Passed: Unknown student not found.")
    else:
        print("Test 3 Failed.")
    
    conn.close()

if __name__ == "__main__":
    test_verification()

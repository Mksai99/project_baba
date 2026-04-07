import sqlite3
import os

def init_db():
    db_path = 'students.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create students table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        roll_number TEXT PRIMARY KEY,
        is_scanned INTEGER DEFAULT 0,
        scanned_at TIMESTAMP DEFAULT NULL
    )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database initialized at {db_path}")

if __name__ == "__main__":
    init_db()

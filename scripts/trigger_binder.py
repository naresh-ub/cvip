from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def main():
    # Set up Chrome options to run in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    # Launch Chrome WebDriver
    driver = webdriver.Chrome(options=chrome_options)

    try:
        # Replace this with your actual website URL
        website_url = 'https://naresh-ub.github.io/grad-notes/'
        print(f'Navigating to {website_url}')
        driver.get(website_url)

        # Wait for the page to load completely
        time.sleep(3)

        # Execute the JavaScript function directly
        print('Executing the initThebeSBT function')
        driver.execute_script('initThebeSBT();')

        # Optionally wait for the process to finish
        time.sleep(5)

        print('Binder triggered successfully.')
        
        # Wait for the binder build status
        print("Waiting for the binder build to complete...")

        # Wait until the status changes to either "ready" or "failed"
        WebDriverWait(driver, 300).until(
            EC.text_to_be_present_in_element((By.CLASS_NAME, 'status'), 'ready')
        )
        
        # Check the status after waiting
        status = driver.find_element(By.CLASS_NAME, 'status').text
        if status == "ready":
            print("Binder is ready.")
        elif status == "failed":
            print("Binder build failed.")
            exit(1)

    except Exception as e:
        print(f'Error occurred: {e}')
        exit(1)

    finally:
        driver.quit()

if __name__ == '__main__':
    main()

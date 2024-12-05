document.addEventListener("DOMContentLoaded", function () {
    const faqList1 = document.getElementById("faqList1");
    const faqList2 = document.getElementById("faqList2");
    const faqList3 = document.getElementById("faqList3");
  
    // Fetch data for "Hành Tửu Lệnh"
    fetch("hanh_tu_lenh.json")
      .then((response) => response.json())
      .then((data) => {
        populateFAQ(data, faqList1);
      })
      .catch((error) => {
        console.error("Error loading hanh_tu_lenh.json:", error);
        showError(faqList1);
      });
  
    // Fetch data for "Thi Hương, Thi Hội, Thi Đình"
    fetch("thi_huong.json")
      .then((response) => response.json())
      .then((data) => {
        populateFAQ(data, faqList2);
      })
      .catch((error) => {
        console.error("Error loading thi_huong.json:", error);
        showError(faqList2);
      });
  
    // Fetch data for "Bao Linh Don"
    fetch("bao_linh_don.json")
      .then((response) => response.json())
      .then((data) => {
        populateFAQ(data, faqList3);
      })
      .catch((error) => {
        console.error("Error loading bao_linh_don.json:", error);
        showError(faqList3);
      });
  
    /**
     * Populate FAQ list with data
     * @param {Array} data - Array of questions and answers
     * @param {HTMLElement} listElement - Target list element
     */
    function populateFAQ(data, listElement) {
      listElement.innerHTML = ""; // Clear any existing content
  
      if (data.length === 0) {
        listElement.innerHTML = "<li>No questions available.</li>";
        return;
      }
  
      data.forEach((item) => {
        const li = document.createElement("li");
  
        // Create a div for the question
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `Câu hỏi: ${item.question}`;
  
        // Create a div for the answer
        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        answerDiv.innerHTML = `Đáp án: ${item.answer}`;
  
        // Create copy button
        const copyBtn = document.createElement("i");
        copyBtn.className = "fas fa-copy copy-icon";
        copyBtn.title = "Copy đáp án";
        copyBtn.addEventListener("click", function () {
          copyText(item.answer); // Copy only the answer
        });
  
        // Append question, answer, and copy button to li
        li.appendChild(questionDiv);
        li.appendChild(answerDiv);
        li.appendChild(copyBtn);
  
        listElement.appendChild(li);
      });
    }
  
    /**
     * Search function
     * @param {string} inputId - ID of the search input field
     * @param {string} listId - ID of the FAQ list to filter
     */
    window.searchFunction = function (inputId, listId) {
      const input = document.getElementById(inputId).value.toLowerCase();
      const list = document.getElementById(listId);
      const items = list.getElementsByTagName("li");
  
      for (let i = 0; i < items.length; i++) {
        const question = items[i].textContent || items[i].innerText;
        if (question.toLowerCase().indexOf(input) > -1) {
          items[i].style.display = "";
        } else {
          items[i].style.display = "none";
        }
      }
    };
  
    /**
     * Function to copy text to clipboard
     * @param {string} text - Text to copy
     */
    function copyText(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  
    /**
     * Display an error message when data fetch fails
     * @param {HTMLElement} listElement - The list element to show error
     */
    function showError(listElement) {
      listElement.innerHTML = "<li>Unable to load FAQs. Please try again later.</li>";
    }
  
    // Tab Switching Logic
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active classes
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));
  
        // Add active classes
        tab.classList.add("active");
        const activeContent = document.getElementById(tab.getAttribute("data-tab"));
        activeContent.classList.add("active");
      });
    });
  });
  
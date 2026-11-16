// Hàm lấy danh sách Repo từ GitHub API
async function fetchRepos() {
    const repoList = document.getElementById('repo-list');
    const username = 'mcsstudio';

    try {
        // Gọi API lấy repo, sắp xếp theo thời gian cập nhật
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();

        // Xóa chữ "Loading..."
        repoList.innerHTML = '';

        repos.forEach(repo => {
            // Bỏ qua repo profile cá nhân (mcsstudio) nếu muốn
            if (repo.name === 'mcsstudio') return;

            // Tạo HTML cho từng repo
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';

            // Xử lý ngôn ngữ (nếu trống thì hiển thị 'N/A')
            const lang = repo.language ? repo.language : 'Code';

            repoCard.innerHTML = `
                <div>
                    <a href="${repo.html_url}" target="_blank" class="repo-title">
                        <i class="fab fa-github"></i> ${repo.name}
                    </a>
                    <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                </div>
                <span class="repo-lang">${lang}</span>
            `;

            repoList.appendChild(repoCard);
        });

        // Nếu không có repo nào
        if (repoList.innerHTML === '') {
            repoList.innerHTML = '<p>No public repositories found.</p>';
        }

    } catch (error) {
        console.error("Error fetching repos:", error);
        repoList.innerHTML = '<p>Failed to load repositories. Please check back later.</p>';
    }
}

// Hiệu ứng mượt mà khi click vào menu (Scroll Smooth)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chạy hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', fetchRepos);

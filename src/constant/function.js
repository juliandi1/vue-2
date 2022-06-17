import $ from 'jquery';
import Tooltip from 'codex-tooltip';

const showToolTip = async (element, text) => {
    const tooltip = new Tooltip();
    const options = {
        placement: 'top'
    }

    tooltip.onHover(element, text, options);
    
    element.addEventListener('click', () => {
        tooltip.hide();
    });
}

const showAlert = async (type, message) => {
    let alert_class = '';

    if (type == 'success') {
        alert_class = 'fas fa-check text-success'
    } else if (type == 'error') {
        alert_class = 'fas fa-times text-danger';
    } else if (type == 'loading') {
        alert_class = 'fas fa-cog fa-spin text-primary';
    }
    
    return {
        type: type,
        message: message,
        class: alert_class
    };
}

const clearAllModal = async () => {
    $('.modal').remove();
}

export { showToolTip, showAlert, clearAllModal }